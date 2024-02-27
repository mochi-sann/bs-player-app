use std::{
    fs::{self, ReadDir},
    path::PathBuf,
};

use crate::get_music_file;
#[derive(Debug , Clone )]
struct SongData {
    music_file: String,
    music_name: String,
    music_dir: String,
}
#[derive(Debug, Clone)]
struct MusicFile {
    music_files: Vec<String>,
    // music_datas : Vec<SongData>,
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

    fn get_song_datas(&self) -> Vec<SongData> {
        let mut file_list: Vec<SongData> = Vec::new();
        let paths = self.get_music_dirs();
        println!("paths : {:?}", paths);
        for path in paths {
            let files_paths = fs::read_dir(path.clone()).unwrap();
            let music_file_list = self.filter_music_files(files_paths);
            let song_data_temp = SongData {
                music_file: music_file_list[0].clone(),
                music_name: path.file_name().unwrap().to_string_lossy().to_string(),
                music_dir: path.to_str().unwrap().to_string(),
            };
            file_list.push(song_data_temp);
        }
        println!("file_list : {:?}", file_list);
        file_list
    }
}

#[tauri::command]
pub fn get_bs_music_files() -> Vec<String> {
    let get_dir_path =
        "C:\\Users\\mochi\\BSManager\\SharedContent\\SharedMaps\\CustomLevels".to_string();
    let file_list = MusicFile::new(get_dir_path);
    file_list.get_music_dirs_files(ile_list.music_files

    let mut bs_dir_list: Vec<PathBuf> = Vec::new();
    let return_resutl = file_list.music_files;
    println!("{:?}", return_resutl);
    // println!("get song datas {:?}", file_list.get_song_datas());
    return_resutl
}
