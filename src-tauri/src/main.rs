// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use crate::{
    config::Settings,
    handler::{folder_exists, handle_get_bs_maps, handle_set_bs_maps_path},
};
use database::db::get_database_url;

use tauri::{async_runtime::block_on, Manager};
use tauri_plugin_log::LogTarget;
use window_shadows::set_shadow;

use std::fs;
mod config;
mod database;
mod get_musc_files;
mod handler;
mod types;

use get_musc_files::get_bs_music_files;
use std::env;

use crate::database::db::{create_sqlite_pool, migrate_database};

const DATABASE_FILE: &str = "bs_player.db";
const DATABASE_DIR: &str = "bs_player_app";

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
fn get_music_file(file_list: Vec<String>, base_dir_path: String) -> Vec<String> {
    let mut music_file_list: Vec<String> = Vec::new();
    for file in file_list {
        if file.ends_with(".wav")
            || file.ends_with(".mp3")
            || file.ends_with(".ogg")
            || file.ends_with(".flac")
            || file.ends_with(".aac")
            || file.ends_with(".m4a")
            || file.ends_with(".wma")
            || file.ends_with(".aiff")
            || file.ends_with(".alac")
            || file.ends_with(".dsd")
            || file.ends_with(".egg")
        {
            music_file_list.push(format!("{}/{}", base_dir_path, file))
        }
    }
    music_file_list
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let database_url = get_database_url();
    let sqlite_pool = block_on(create_sqlite_pool(&database_url))?;
    let settings = Settings::default();
    println!("{:?}", settings);
       let app_state = config::AppState::new();


    //  データベースファイルが存在しなかったなら、マイグレーションSQLを実行する
    block_on(migrate_database(&sqlite_pool))?;

    tauri::Builder::default()
        .manage(app_state)
        .setup(|app| {
            app.manage(sqlite_pool);

            // "main" ウィンドウの取得
            let main_window = app.get_window("main").unwrap();

            // ウィンドウに window-shadows の装飾を適用
            // Windows, macOS で有効
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();

            #[cfg(any(windows, target_os = "macos"))]
            set_shadow(main_window, true).unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            get_file_list,
            get_music_file,
            get_bs_music_files,
            handle_get_bs_maps,
            handle_set_bs_maps_path,
            folder_exists
            ,config::commands::set_language
            , config::commands::set_theme
            , config::commands::get_settings
        ])
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
