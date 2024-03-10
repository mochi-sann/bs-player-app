use std::{collections::BTreeMap, str::FromStr};

use futures::TryStreamExt;
use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous}, Row, SqliteConnection, SqlitePool,
};




/// このモジュール内の関数の戻り値型
type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

/// SQLiteのコネクションプールを作成して返す
pub(crate) async fn create_sqlite_pool(database_url: &str) -> DbResult<SqlitePool> {
    // コネクションの設定
    let connection_options = SqliteConnectOptions::from_str(database_url)?
        // DBが存在しないなら作成する
        .create_if_missing(true)
        // トランザクション使用時の性能向上のため、WALを使用する
        .journal_mode(SqliteJournalMode::Wal)
        .synchronous(SqliteSynchronous::Normal);

    // 上の設定を使ってコネクションプールを作成する
    let sqlite_pool = SqlitePoolOptions::new()
        .connect_with(connection_options)
        .await?;

    Ok(sqlite_pool)
}

/// マイグレーションを行う
pub(crate) async fn migrate_database(pool: &SqlitePool) -> DbResult<()> {
    sqlx::migrate!("./migrations").run(pool).await?;
    Ok(())
}

pub(crate) async fn get_all_songs(pool: &SqlitePool) -> DbResult<Vec<BTreeMap<String, String>>> {
    let mut songs = vec![];
    let mut tx = pool.begin().await?;
    let mut cursor = sqlx::query("SELECT * FROM songs").fetch(&mut tx as &mut SqliteConnection);

    while let Some(row) = cursor.try_next().await? {
        let mut song = BTreeMap::new();
        song.insert("id".to_string(), row.get(0));
        song.insert("title".to_string(), row.get(1));
        song.insert("artist".to_string(), row.get(2));
        song.insert("path".to_string(), row.get(3));
        songs.push(song);
    }

    Ok(songs)
}
