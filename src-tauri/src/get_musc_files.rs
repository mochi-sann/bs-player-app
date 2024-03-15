use lofty::{AudioFile, Probe, TaggedFile, TaggedFileExt};
use log::{info, warn};
use sqlx::{prelude::FromRow, SqlitePool};
use std::{
    collections::HashSet,
    fs::{self, File},
    io::BufReader,
    path::PathBuf,
    time::Duration,
};
use tauri::{async_runtime::block_on, State};

use serde::Serialize;
use serde_json::Value;

use ts_rs::TS;

use crate::{
    database::songs::{add_song, get_all_song, get_all_song_map_dir, get_songs_by_music_dir},
    types::info_dat_types::load_book_from_json_file,
};

#[derive(Debug, Clone, Serialize, TS, PartialEq, FromRow)]
#[ts(export)]
pub struct SongData {
    pub id: i32,
    pub music_file: String,
    pub music_name: String,
    pub music_dir: String,
    pub mapper: String,
    pub auther: String,
    pub image: String,
    pub length_of_music_sec: i32,
    pub length_of_music_millisec: i32,
}
#[derive(Debug, Clone, Serialize, TS)]
#[ts(export)]
pub struct SongInfoDat {
    song_name: String,
    song_auther: String,
    mapper: String,
    bpm: i32,
    song_file_name: String,
    cover_image: String,
}
#[derive(Debug, Clone)]
struct MusicFile {
    dir_path: String,
}

impl MusicFile {
    fn new(dir_path: String) -> MusicFile {
        MusicFile { dir_path }
    }
    // bs のCustomLevelsのフォルダを取得する
    fn get_music_dirs(&self) -> Vec<PathBuf> {
        let mut file_list: Vec<PathBuf> = Vec::new();
        let paths = fs::read_dir(&self.dir_path).unwrap();

        for path in paths {
            let path = path.unwrap().path();
            file_list.push(path);
        }
        file_list
    }
    // bs のCustomLevelsのフォルダをから音楽ファイルを取得する
    fn get_info_dat(&self, dir: PathBuf) -> Result<Value, Box<dyn std::error::Error>> {
        let info_dat_path = dir.join("info.dat");
        // info_dat_pathが存在するかどうか
        if !info_dat_path.exists() {
            // なければ空のデータを返す
            return Err(Box::new(std::io::Error::new(
                std::io::ErrorKind::NotFound,
                "info.datが存在しません",
            )));
        }
        let json_info_dat = load_book_from_json_file(info_dat_path.as_path())?;
        Ok(json_info_dat)
    }
    //音楽ファイルから秒数を取得する
    fn get_bs_music_durication(
        &self,
        music_file_path: PathBuf,
    ) -> Result<Duration, Box<dyn std::error::Error>> {
        if !music_file_path.exists() {
            // なければ空のデータを返す
            return Err(Box::new(std::io::Error::new(
                std::io::ErrorKind::NotFound,
                "音楽ファイルがが存在しません",
            )));
        }
        // pathの最後の拡張子が.eggだった場合.oggに変換する
        // if path.extension().unwrap() == "egg" {
        //     path.set_extension("ogg");
        // }

        let tagged_file: TaggedFile = match music_file_path.extension().unwrap().to_str().unwrap() {
            "egg" => {
                let file = File::open(music_file_path).expect("ERROR: Failed to open file!");
                let reader = BufReader::new(file);
                let probe = Probe::with_file_type(reader, lofty::FileType::Vorbis);

                probe.read().expect("ERROR: Failed to read file!")
            }
            _ => {
                log::error!("Failed to get music duration: ");
                return Err(Box::new(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "音楽ファイルがが存在しません",
                )));
                // let tagged_file = Probe::open(music_file_path.as_path())
                //     .expect("ERROR: Bad path provided!")
                //     .read()
                //     .expect("ERROR: Failed to read file!");
                // tagged_file
            }
        };

        let _tag = match tagged_file.primary_tag() {
            Some(primary_tag) => primary_tag,
            // If the "primary" tag doesn't exist, we just grab the
            // first tag we can find. Realistically, a tag reader would likely
            // iterate through the tags to find a suitable one.
            None => tagged_file.first_tag().expect("ERROR: No tags found!"),
        };

        let properties = tagged_file.properties();

        let duration = properties.duration();
        let _seconds = duration.as_secs();
        Ok(duration)
    }

    fn db_check_and_get_song_data(&self, path: PathBuf) -> SongData {
        let db_song_data = block_on(get_songs_by_music_dir(path.to_str().unwrap().to_string()));
        match db_song_data {
            Ok(song_data) => {
                info!("song_data : {:?}", song_data);
                song_data
            }
            Err(_) => {
                info!("db_song_data : {:?}", db_song_data);
                let info_dat = self.get_info_dat(path.clone()).unwrap();
                let musicfile_file_path =
                    PathBuf::from(info_dat["_songFilename"].as_str().unwrap_or_default());
                let full_music_file_path = path.join(musicfile_file_path);
                let full_music_image_path =
                    path.join(info_dat["_coverImageFilename"].as_str().unwrap_or_default());
                let music_file_path = full_music_file_path.to_str().unwrap().to_string();
                let music_name = info_dat["_songName"]
                    .as_str()
                    .unwrap_or_default()
                    .to_string();
                let music_dir = path.to_str().unwrap().to_string();
                let mapper = info_dat["_levelAuthorName"]
                    .as_str()
                    .unwrap_or_default()
                    .to_string();
                let auther = info_dat["_songAuthorName"]
                    .as_str()
                    .unwrap_or_default()
                    .to_string();
                let image = full_music_image_path.to_str().unwrap().to_string();
                let length_of_music = match self.get_bs_music_durication(full_music_file_path) {
                    Ok(duration) => duration.as_millis(),
                    Err(err) => {
                        warn!(
                            "path : {:?} , 音楽ファイルの読み込みに失敗しました: {:?} ",
                            path.to_str(),
                            err
                        );
                        0
                    }
                };
                let song_data = SongData {
                    id: 0,
                    music_file: music_file_path,
                    music_name,
                    music_dir,
                    mapper,
                    auther,
                    image,
                    length_of_music_sec: (length_of_music / 1000) as i32,
                    length_of_music_millisec: length_of_music as i32,
                };
                let _ = block_on(add_song(song_data.clone()));

                song_data
            }
        }
    }
    fn get_all_song_map_dir(&self, pool: &SqlitePool) -> Vec<String> {
        match block_on(get_all_song_map_dir(pool)) {
            Ok(value) => value,
            Err(_) => Vec::new(),
        }
    }

    fn get_song_data(&self, pool: &SqlitePool) -> Vec<SongData> {
        println!("get_song_datas : ");
        let paths = self.get_music_dirs();
        let music_file_lis_db = self.get_all_song_map_dir(pool);
        let paths_string = path_to_string(paths.clone());
        let (only_in_files, _only_in_db) = unique_elements(paths_string, music_file_lis_db);
        println!("only_in_files : {:?}", only_in_files);

        for only_in_file in only_in_files.iter() {
            let path = PathBuf::from(only_in_file);
            match self.get_info_dat(path.clone()) {
                Ok(info_dat) => {
                    let _musicfile_file_path = self.db_check_and_get_song_data(path.clone());
                    let _ = PathBuf::from(info_dat["_songFilename"].as_str().unwrap_or_default());
                }
                Err(err) => {
                    warn!(
                        "path : {:?} , JSON ファイルの読み込みに失敗しました: {:?} ",
                        path.to_str(),
                        err
                    );
                }
            }
        }

        let file_list: Vec<SongData> = match block_on(get_all_song(pool)) {
            Ok(result) => result,
            Err(err) => {
                // Handle the error here, e.g. print an error message or return an empty vector
                println!("Error: {:?}", err);
                Vec::new()
            }
        };
        file_list
    }
}

#[tauri::command]
pub fn get_bs_music_files(sqlite_pool: State<'_, SqlitePool>) -> Vec<SongData> {
    let get_dir_path =
        "C:\\Users\\mochi\\BSManager\\SharedContent\\SharedMaps\\CustomLevels".to_string();
    let file_list = MusicFile::new(get_dir_path);
    println!("file_list : {:?}", file_list);

    file_list.get_song_data(&sqlite_pool)
}

fn path_to_string(paths: Vec<PathBuf>) -> Vec<String> {
    let mut paths_string: Vec<String> = Vec::new();
    for path in paths {
        paths_string.push(path.to_str().unwrap().to_string());
    }

    paths_string
}
fn unique_elements<T: std::cmp::Eq + std::hash::Hash + Clone>(
    vec1: Vec<T>,
    vec2: Vec<T>,
) -> (HashSet<T>, HashSet<T>) {
    let set1: HashSet<_> = vec1.into_iter().collect();
    let set2: HashSet<_> = vec2.into_iter().collect();

    let only_in_set1: HashSet<_> = set1.difference(&set2).cloned().collect();
    let only_in_set2: HashSet<_> = set2.difference(&set1).cloned().collect();

    (only_in_set1, only_in_set2)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[derive(Debug, Clone, Serialize, TS, PartialEq, FromRow, Eq, Hash)]
    struct TestStruc {
        a: i32,
        text: String,
    }

    #[test]
    fn test_unique_elements() {
        let vec1 = vec![1, 2, 3, 4, 5];
        let vec2 = vec![4, 5, 6, 7, 8];

        let (only_in_vec1, only_in_vec2) = unique_elements(vec1, vec2);

        assert_eq!(
            only_in_vec1,
            [1, 2, 3].iter().cloned().collect::<HashSet<_>>()
        );
        assert_eq!(
            only_in_vec2,
            [6, 7, 8].iter().cloned().collect::<HashSet<_>>()
        );
    }
    #[test]
    fn test_unique_elements_struc_same() {
        let vec1 = vec![
            TestStruc {
                a: 1,
                text: "a".to_string(),
            },
            TestStruc {
                a: 2,
                text: "b".to_string(),
            },
            TestStruc {
                a: 3,
                text: "c".to_string(),
            },
        ];
        let vec2 = vec![
            TestStruc {
                a: 1,
                text: "a".to_string(),
            },
            TestStruc {
                a: 2,
                text: "b".to_string(),
            },
            TestStruc {
                a: 3,
                text: "c".to_string(),
            },
        ];

        let (only_in_vec1, only_in_vec2) = unique_elements(vec1, vec2);

        assert_eq!(only_in_vec1, [].iter().cloned().collect::<HashSet<_>>());
        assert_eq!(only_in_vec2, [].iter().cloned().collect::<HashSet<_>>());
    }
    #[test]
    fn test_unique_elements_struc_left() {
        let vec1 = vec![
            TestStruc {
                a: 1,
                text: "a".to_string(),
            },
            TestStruc {
                a: 2,
                text: "b".to_string(),
            },
            TestStruc {
                a: 3,
                text: "c".to_string(),
            },
            TestStruc {
                a: 5,
                text: "b".to_string(),
            },
        ];
        let vec2 = vec![
            TestStruc {
                a: 1,
                text: "a".to_string(),
            },
            TestStruc {
                a: 2,
                text: "b".to_string(),
            },
            TestStruc {
                a: 3,
                text: "c".to_string(),
            },
        ];

        let (only_in_vec1, only_in_vec2) = unique_elements(vec1, vec2);

        assert_eq!(
            only_in_vec1,
            [TestStruc {
                a: 5,
                text: "b".to_string()
            }]
            .iter()
            .cloned()
            .collect::<HashSet<_>>()
        );
        assert_eq!(only_in_vec2, [].iter().cloned().collect::<HashSet<_>>());
    }
    #[test]
    fn test_path_to_string() {
        let paths: Vec<PathBuf> = vec![
            PathBuf::from("/path/to/file1"),
            PathBuf::from("/path/to/file2"),
            PathBuf::from("/path/to/file3"),
        ];

        let expected: Vec<String> = vec![
            String::from("/path/to/file1"),
            String::from("/path/to/file2"),
            String::from("/path/to/file3"),
        ];

        assert_eq!(path_to_string(paths), expected);
    }
}
