use std::{
    error::Error,
    fs::{self, ReadDir},
    num::ParseIntError,
    path::PathBuf,
    string,
};

use serde::Serialize;
use serde_json::Value;

use crate::{get_music_file, types::info_dat_types::{load_book_from_json_file, BsInfoDat}};

#[derive(Debug, Clone, Serialize)]
pub struct SongData {
    music_file: String,
    music_name: String,
    music_dir: String,
    mapper: String , 
    Auther : String ,
}
#[derive(Debug, Clone, Serialize)]
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
    fn get_music_dirs_files(&self) -> Vec<String> {
        let mut file_list: Vec<String> = Vec::new();
        let paths = self.get_music_dirs();
        println!("paths : {:?}", paths);
        for path in paths {
            let files_paths = fs::read_dir(path).unwrap();
            let music_file_list = self.filter_music_files(files_paths);
            file_list.extend(music_file_list);
        }
        println!("file_list : {:?}", file_list);
        file_list
    }
    fn filter_music_files(&self, file: ReadDir) -> Vec<String> {
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
        // println!("info_dat : {:?}", info_dat);
        // あれば読み込む
        // なければ空のデータを返す
        Ok(json_info_dat)
    }

    fn get_song_datas(&self) -> Vec<SongData> {
        let mut file_list: Vec<SongData> = Vec::new();
        let paths = self.get_music_dirs();
        for path in paths {
            let files_paths = fs::read_dir(path.clone()).unwrap();
            let music_file_list = self.filter_music_files(files_paths);
            match self.get_info_dat(path.clone()) {
                Ok(info_dat) => {
                    let musicfile_file_path = PathBuf::from( info_dat["_songFilename"].as_str().unwrap_or_default());
                    let full_music_file_path = path.join(musicfile_file_path);
                    println!("info_dat : {:?}", full_music_file_path);
                    let song_data_temp = SongData {
                        music_file: full_music_file_path.to_str().unwrap().to_string(),
                        music_name: info_dat["_songName"].as_str().unwrap_or_default().to_string(),
                        music_dir: path.to_str().unwrap().to_string(),
                        Auther : info_dat["_songAuthorName"].as_str().unwrap_or_default().to_string(),
                        mapper : info_dat["_levelAuthorName"].as_str().unwrap_or_default().to_string(),
                    };
                    file_list.push(song_data_temp);
                }
                Err(err) => {
                    eprintln!("path : {:?} , JSON ファイルの読み込みに失敗しました: {:?} ", path.to_str(), err);
                }
                
            }
        }
        println!("file_list : {:?}", file_list);
        file_list
    }
}

#[tauri::command]
pub fn get_bs_music_files() -> Vec<SongData> {
    let get_dir_path =
        "C:\\Users\\mochi\\BSManager\\SharedContent\\SharedMaps\\CustomLevels".to_string();
    let file_list = MusicFile::new(get_dir_path);

    let return_resutl = &file_list.music_files;
    let music_data = file_list.get_song_datas();
    music_data
}
