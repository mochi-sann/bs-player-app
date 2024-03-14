use lofty::{AudioFile, Probe, TaggedFile, TaggedFileExt};
use log::{info, warn};
use sqlx::{pool, prelude::FromRow};
use std::{
    fs::{self, File, ReadDir},
    io::BufReader,
    path::PathBuf,
    time::Duration,
};
use tauri::{async_runtime::block_on, State};

use serde::Serialize;
use serde_json::Value;
use ts_rs::TS;
use std::error::Error;

use crate::{
    database::{
        db::{self, create_sqlite_pool},
        maps_path::get_maps_dir_path,
        songs::{add_song, get_songs_by_music_dir},
    },
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
    music_files: Vec<String>,
    dir_path: String,
}

impl MusicFile {
    fn new(dir_path: String) -> MusicFile {
        MusicFile {
            dir_path,
            music_files: Vec::new(),
        }
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
        let db_song_data = block_on( get_songs_by_music_dir(path.to_str().unwrap().to_string()));
        match db_song_data {
            Ok(song_data) => song_data,
            Err(_) => {
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
                let length_of_music = self
                    .get_bs_music_durication(full_music_file_path)
                    .unwrap()
                    .as_millis();
                let song_data = SongData {
                    id: 0,
                    music_file: music_file_path,
                    music_name: music_name,
                    music_dir: music_dir,
                    mapper: mapper,
                    auther: auther,
                    image: image,
                    length_of_music_sec: (length_of_music / 1000) as i32,
                    length_of_music_millisec: length_of_music as i32,
                };
                let _result = add_song(song_data.clone());

                song_data
            }
        }
    }

    fn get_song_datas(&self) -> Vec<SongData> {
        println!("get_song_datas : ");
        let mut file_list: Vec<SongData> = Vec::new();
        let paths = self.get_music_dirs();
        for (index, path) in paths.iter().enumerate() {
            let _files_paths = fs::read_dir(path.clone()).unwrap();
            match self.get_info_dat(path.clone()) {
                Ok(info_dat) => {
                    let musicfile_file_path =
                        PathBuf::from(info_dat["_songFilename"].as_str().unwrap_or_default());

                    let song_data_temp = self.db_check_and_get_song_data(path.clone()); // log::info!("song_data_temp {:?}", song_data_temp);
                    file_list.push(song_data_temp);
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
        file_list
    }
}

#[tauri::command]
pub fn get_bs_music_files() -> Vec<SongData> {
    let get_dir_path =
        "C:\\Users\\mochi\\BSManager\\SharedContent\\SharedMaps\\CustomLevels".to_string();
    let file_list = MusicFile::new(get_dir_path);
    println!("file_list : {:?}", file_list);


    file_list.get_song_datas()
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn musics_len() {
        // src-tauri\test\assets\maps\01 への絶対パスを取得する
        let dir_path = String::from("./test/assets/maps");

        let absolute_path = fs::canonicalize(dir_path).unwrap();

        let dir_path = String::from(absolute_path.to_str().unwrap());
        let music_file = MusicFile::new(dir_path);
        let music_data = music_file.get_song_datas();
        assert_eq!(music_data.len(), 1);
    }
    #[test]
    fn musics_data() {
        // src-tauri\test\assets\maps\01 への絶対パスを取得する
        let dir_path = String::from("./test/assets/maps");

        let absolute_path = fs::canonicalize(dir_path).unwrap();

        let dir_path = String::from(absolute_path.to_str().unwrap());
        let music_file = MusicFile::new(dir_path);
        let music_data = music_file.get_song_datas();
        let song = SongData {
            id: 0,
            music_file: absolute_path
                .join("01")
                .join("song.egg")
                .to_str()
                .unwrap()
                .to_string(),
            music_name: "sample_song".to_string(),
            music_dir: absolute_path.join("01").to_str().unwrap().to_string(),
            mapper: "mapper name".to_string(),
            auther: "auther name".to_string(),
            image: absolute_path
                .join("01")
                .join("cover.jpg")
                .to_str()
                .unwrap()
                .to_string(),
            length_of_music_sec: 1,
            length_of_music_millisec: 1451,
        };
        assert_eq!(music_data.first().unwrap(), &song);
    }
}
