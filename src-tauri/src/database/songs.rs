use serde::Serialize;
use sqlx::{prelude::FromRow, Sqlite, SqlitePool};
use ts_rs::TS;

use crate::{database::db::DbResult, get_musc_files::SongData};
use log;

pub async fn get_songs_by_music_dir(
    music_dir: String,
    pool: &SqlitePool,
) -> Result<SongData, sqlx::Error> {
    log::info!("add_song : {:?}", music_dir);

    let data = sqlx::query_as::<Sqlite, SongData>("SELECT * FROM songs WHERE music_dir = ?")
        .bind(music_dir)
        .fetch_one(pool)
        .await?;

    Ok(data)
}
pub async fn get_all_song(pool: &SqlitePool) -> Result<Vec<SongData>, sqlx::Error> {
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
pub async fn get_all_song_map_dir(pool: &SqlitePool) -> Result<Vec<String>, sqlx::Error> {
    let data = sqlx::query_as::<Sqlite, SongDataMapDirOnly>("SELECT music_dir  FROM songs; ")
        .fetch_all(pool)
        .await?;
    // Vec<SongDataMapDirOnly> を Vec<String> に変換する
    let mut music_dir_list: Vec<String> = Vec::new();
    for song in data {
        music_dir_list.push(song.music_dir);
    }

    Ok(music_dir_list)
}

pub async fn add_song(pool: &SqlitePool, data: SongData) -> DbResult<()> {
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
    .execute(pool)
    .await?;

    Ok(())
}
