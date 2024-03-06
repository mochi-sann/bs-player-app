use lofty::{ AudioFile,  Probe, TaggedFile, TaggedFileExt};
use log::{ warn};
use std::{
    fs::{self, File, ReadDir},
    io::BufReader,
    path::PathBuf, time::Duration,
};

use serde::Serialize;
use serde_json::Value;
use ts_rs::TS;

use crate::types::info_dat_types::load_book_from_json_file;

#[derive(Debug, Clone, Serialize, TS)]
#[ts(export)]
pub struct SongData {
    id: i32,
    music_file: String,
    music_name: String,
    music_dir: String,
    mapper: String,
    auther: String,
    image: String,
    length_of_music_sec: i32,
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
    fn _get_music_dirs_files(&self) -> Vec<String> {
        let mut file_list: Vec<String> = Vec::new();
        let paths = self.get_music_dirs();
        for path in paths {
            let files_paths = fs::read_dir(path).unwrap();
            let music_file_list = self._filter_music_files(files_paths);
            file_list.extend(music_file_list);
        }
        file_list
    }
    fn _filter_music_files(&self, file: ReadDir) -> Vec<String> {
        let mut music_file_list: Vec<String> = Vec::new();

        for file in file {
            let path = file.unwrap().path();
            if path.extension().unwrap() == "wav"
                || path.extension().unwrap() == "egg"
                || path.extension().unwrap() == "mp3"
                || path.extension().unwrap() == "ogg"
                || path.extension().unwrap() == "flac"
                || path.extension().unwrap() == "aac"
                || path.extension().unwrap() == "m4a"
                || path.extension().unwrap() == "wma"
                || path.extension().unwrap() == "aiff"
                || path.extension().unwrap() == "alac"
                || path.extension().unwrap() == "dsd"
            {
                music_file_list.push(path.to_str().unwrap().to_string());
            }
        }
        music_file_list
    }

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
    fn get_bs_music_durication(&self, music_file_path: PathBuf) ->Result< Duration , Box<dyn std::error::Error> > {
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

        let tagged_file: TaggedFile = match music_file_path.extension().unwrap().to_str().unwrap()
        {
            "egg" => {
                let file = File::open(music_file_path).expect("ERROR: Failed to open file!");
                let reader = BufReader::new(file);
                let probe = Probe::with_file_type(reader, lofty::FileType::Vorbis);
                let tagged_file = probe.read().expect("ERROR: Failed to read file!");
                tagged_file
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
        let _seconds = duration.as_secs() ;
        Ok(duration)
    }

    fn get_song_datas(&self) -> Vec<SongData> {
        let mut file_list: Vec<SongData> = Vec::new();
        let paths = self.get_music_dirs();
        for (index , path)in paths.iter().enumerate() {
            let _files_paths = fs::read_dir(path.clone()).unwrap();
            match self.get_info_dat(path.clone()) {
                Ok(info_dat) => {
                    let musicfile_file_path =
                        PathBuf::from(info_dat["_songFilename"].as_str().unwrap_or_default());
                    let full_music_file_path = path.join(musicfile_file_path);
                    let full_music_image_path =
                        path.join(info_dat["_coverImageFilename"].as_str().unwrap_or_default());

                    let song_data_temp = SongData {
                        id: index as i32,
                        music_file: full_music_file_path.to_str().unwrap().to_string(),
                        music_name: info_dat["_songName"]
                            .as_str()
                            .unwrap_or_default()
                            .to_string(),
                        music_dir: path.to_str().unwrap().to_string(),
                        auther: info_dat["_songAuthorName"]
                            .as_str()
                            .unwrap_or_default()
                            .to_string(),
                        mapper: info_dat["_levelAuthorName"]
                            .as_str()
                            .unwrap_or_default()
                            .to_string(),
                        image: full_music_image_path.to_str().unwrap().to_string(),
                        length_of_music_sec: match self.get_bs_music_durication(full_music_file_path) {
                            Ok(duration) => duration.as_secs() as i32,
                            Err(err) => {
                                // Handle the error case, e.g. log an error message
                                log::error!("Failed to get music duration: {:?}", err);
                                0 // Return a default value
                            }
                        },
                    };
                    // log::info!("song_data_temp {:?}", song_data_temp);
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

    let _return_resutl = &file_list.music_files;
    let music_data = file_list.get_song_datas();
    music_data
}
