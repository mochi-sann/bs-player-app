use serde::Serialize;
use sqlx::{prelude::FromRow, Connection, Sqlite, SqliteConnection, SqlitePool};
use ts_rs::TS;

use crate::{database::db::DbResult, get_musc_files::SongData};
use log;

use super::db::get_database_url;

pub async fn get_songs_by_music_dir(music_dir: String) -> Result<SongData, sqlx::Error> {
    log::info!("add_song : {:?}", music_dir);
    let mut tx: SqliteConnection = SqliteConnection::connect(&get_database_url()).await?;

    let data = sqlx::query_as::<Sqlite, SongData>("SELECT * FROM songs WHERE music_dir = ?")
        .bind(music_dir)
        .fetch_one(&mut tx as &mut SqliteConnection)
        .await?;

    Ok(data)
}
pub async fn get_all_song(pool: &SqlitePool) -> Result<Vec<SongData>, sqlx::Error> {
    let mut tx: SqliteConnection = SqliteConnection::connect(&get_database_url()).await?;

    let data = sqlx::query_as::<Sqlite, SongData>("SELECT * FROM songs")
        .fetch_all(pool)
        .await?;

    Ok(data)
}

#[derive(Debug, Clone, Serialize, TS, PartialEq, FromRow)]
#[ts(export)]
pub struct SongDataMapDirOnly {
    pub music_dir: String,
}
pub async fn get_all_song_map_dir(
    pool: &SqlitePool,
) -> Result<Vec<SongDataMapDirOnly>, sqlx::Error> {
    let data = sqlx::query_as::<Sqlite, SongDataMapDirOnly>("SELECT music_dir  FROM songs; ")
        .fetch_all(pool)
        .await?;

    Ok(data)
}

pub async fn add_song(data: SongData) -> DbResult<()> {
    let mut tx: SqliteConnection = SqliteConnection::connect(&get_database_url()).await?;
    log::info!("add_song : {:?}", data);

    sqlx::query("INSERT INTO songs (music_file, music_name, music_dir, mapper, auther, image, length_of_music_sec, length_of_music_millisec) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(data.music_file) // Make sure to use a reference to the field
    .bind(data.music_name)
    .bind(data.music_dir)
    .bind(data.mapper)
    .bind(data.auther)
    .bind(data.image)
    .bind(data.length_of_music_sec)
    .bind(data.length_of_music_millisec)
    .execute(&mut tx as &mut SqliteConnection)
    .await?;

    Ok(())
}
