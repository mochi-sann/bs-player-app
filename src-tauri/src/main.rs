// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
mod get_musc_files;
use get_musc_files::get_bs_music_files;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn get_file_list(get_dir_path: String) -> Vec<String> {
    let mut file_list: Vec<String> = Vec::new();
    let paths = fs::read_dir(get_dir_path).unwrap();
    for path in paths {
        let path = path.unwrap().path();
        let file_name = path.file_name().unwrap().to_str().unwrap().to_string();
        println!("{}", file_name);
        file_list.push(file_name);
    }
    file_list
}
// get_file_listから帰ってきたファイルに音楽ファイルがあったらそれを返す
// なかったら何も返さない
// wav, mp3, ogg, flac, aac, m4a, wma, aiff, alac, dsd , egg 
// これらの拡張子を持つファイルがあったらそれを返す

// それ以外のファイルがあったら何も返さない
// なかったら何も返さない
#[tauri::command]
fn get_music_file(file_list: Vec<String> , base_dir_path : String) -> Vec<String> {
    let mut music_file_list: Vec<String> = Vec::new();
    for file in file_list {
        if file.ends_with(".wav") || file.ends_with(".mp3") || file.ends_with(".ogg") || file.ends_with(".flac") || file.ends_with(".aac") || file.ends_with(".m4a") || file.ends_with(".wma") || file.ends_with(".aiff") || file.ends_with(".alac") || file.ends_with(".dsd") || file.ends_with(".egg") {
            music_file_list.push(format!("{}/{}", base_dir_path, file))
        }
    }
    music_file_list
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_file_list,  get_music_file , get_bs_music_files]) 
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
