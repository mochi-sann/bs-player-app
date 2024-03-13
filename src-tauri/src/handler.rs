use tauri::State;

use crate::database::maps_path::{get_maps_dir_path, MapsDirPath};
use std::path::Path;

/// Handles the command to get the list of maps directory paths.
///
/// # Arguments
///
/// * `sqlite_pool` - The SQLite connection pool.
///
/// # Returns
///
/// Returns a `Result` containing a vector of `MapsDirPath` on success, or an error message as a `String` on failure.
#[tauri::command]
pub async fn handle_get_bs_maps(
    sqlite_pool: State<'_, sqlx::SqlitePool>,
) -> Result<Vec<MapsDirPath>, String> {
    let maps = get_maps_dir_path(&*sqlite_pool)
        .await
        .map_err(|e| e.to_string())?;
    Ok(maps)
}

/// Handles the command to set the maps directory path.
///
/// # Arguments
///
/// * `sqlite_pool` - The SQLite connection pool.
/// * `path` - The path to the maps directory.
///
/// # Returns
///
/// Returns `Ok(())` on success, or an error message as a `String` on failure.
#[tauri::command]
pub async fn handle_set_bs_maps_path(
    sqlite_pool: State<'_, sqlx::SqlitePool>,
    path: String,
) -> Result<(), String> {
    println!("path: {}", path);
    crate::database::maps_path::add_maps_dir_path(&*sqlite_pool, path)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn folder_exists(folder_path: String) -> bool {
    println!("folder_path: {}", folder_path);
    Path::new(&folder_path).exists()
}
