use std::{fs, path::PathBuf};

use crate::get_music_file;
struct MusicFile {
  dir_path: String,
}

impl MusicFile {
  fn new(dir_path: String) -> MusicFile {
    MusicFile { dir_path }
  }
  fn get_music_dirs(&self) -> Vec<PathBuf> {
    let mut file_list: Vec<PathBuf> = Vec::new();
    let paths = fs::read_dir(&self.dir_path).unwrap();

    for path in paths {
      let path = path.unwrap().path();
      file_list.push(path);
    }
    file_list
  }
  fn get_music_dirs_files(&self) -> Vec<String> {
    let mut file_list: Vec<String> = Vec::new();
    let paths = fs::read_dir(&self.dir_path).unwrap();
    for path in paths {
      let path = path.unwrap().path();
      let file_name = path.file_name().unwrap().to_str().unwrap().to_string();
      println!("{}", file_name);
      file_list.push(file_name);
    }
    file_list
  }

}

#[tauri::command]
pub fn get_bs_music_files() -> Vec<String> {
  let mut bs_dir_list: Vec<PathBuf> = Vec::new();
  let get_dir_path = "C:\\Users\\mochi\\BSManager\\SharedContent\\SharedMaps\\CustomLevels".to_string();
  let paths = fs::read_dir(get_dir_path).unwrap();

  for path in paths {
    let path = path.unwrap().path();
    let file_name = path.file_name().unwrap().to_str().unwrap().to_string();
  
    // ディレクトリかどうかを判定する
    if !path.is_dir() {
      continue;
    }

    println!("file list{}", path.canonicalize().unwrap().to_str().unwrap().to_string());
    bs_dir_list.push(path);
  }

  println!("bs_dir_list{:?}", bs_dir_list);
  let temp_files  : Vec<String> = Vec::new();
  for bs in bs_dir_list {
    // したいしたファイルにあったファイル一覧
    let bs_files = fs::read_dir(bs).unwrap();
    for file in bs_files {
      let file = file.unwrap().path();
      let file_name = file.file_name().unwrap().to_str().unwrap().to_string();

    }
  }
  // let musics = get_music_file(bs, base_dir_path);

  bs_dir_list
}