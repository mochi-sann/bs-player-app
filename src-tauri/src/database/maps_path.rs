use std::collections::BTreeMap;

use futures::TryStreamExt;
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use ts_rs::TS;

use super::db::DbResult;
use sqlx::Row;

pub async fn set_maps_dir_path(pool: &SqlitePool, path: String) -> DbResult<()> {
    // トランザクションを開始する
    // cardsテーブルにカードを挿入する
    sqlx::query("INSERT INTO maps_dir_path (path) VALUES (?)")
        .bind(path)
        .execute(pool)
        .await?;

    Ok(())
}
#[derive(Debug, Serialize, Deserialize, TS, PartialEq)]
#[ts(export)]
pub struct MapsDirPath {
    pub id: i32,
    pub path: String,
    pub created_at: String,
    pub updated_at: String,
}

impl MapsDirPath {
    pub fn new(id: i32, path: String, created_at: String, updated_at: String) -> Self {
        Self {
            id,
            path,
            created_at,
            updated_at,
        }
    }
}

pub async fn get_maps_dir_path(pool: &SqlitePool) -> DbResult<Vec<MapsDirPath>> {
    const SQL1: &str = "SELECT * FROM maps_dir_path ORDER BY id ASC";
    let mut rows = sqlx::query(SQL1).fetch(pool);

    let mut columns = BTreeMap::new();

    while let Some(row) = rows.try_next().await? {
        let id: i32 = row.try_get("id")?;
        let path: String = row.try_get("path")?;
        let created_at: String = row.try_get("created_at")?;
        let updated_at: String = row.try_get("updated_at")?;
        columns.insert(id, MapsDirPath::new(id, path, created_at, updated_at));
    }

    Ok(columns.into_values().collect())
}

pub async fn delete_maps_dir_path(pool: &SqlitePool, id: i32) -> DbResult<()> {
    // トランザクションを開始する
    // cardsテーブルにカードを挿入する
    sqlx::query("DELETE FROM maps_dir_path WHERE id = ?")
        .bind(id)
        .execute(pool)
        .await?;

    Ok(())
}
pub async fn add_maps_dir_path(pool: &SqlitePool, path: String) -> DbResult<()> {
    // トランザクションを開始する
    // cardsテーブルにカードを挿入する
    sqlx::query("INSERT INTO maps_dir_path (path) VALUES (?)")
        .bind(path)
        .execute(pool)
        .await?;

    Ok(())
}

pub async fn update_maps_dir_path(pool: &SqlitePool, id: i32, path: String) -> DbResult<()> {
    // トランザクションを開始する
    // cardsテーブルにカードを挿入する
    sqlx::query("UPDATE maps_dir_path SET path = ? WHERE id = ?")
        .bind(path)
        .bind(id)
        .execute(pool)
        .await?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use crate::database::db::{create_sqlite_pool, migrate_database};

    use super::*;
    #[tokio::test]
    async fn test_set_maps_dir_path() {
        let pool = create_sqlite_pool("sqlite::memory:").await.unwrap();
        migrate_database(&pool).await.unwrap();

        let path = String::from("/path/to/maps");

        let result = set_maps_dir_path(&pool, path).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_maps_dir_path() {
        let pool = create_sqlite_pool("sqlite::memory:").await.unwrap();
        migrate_database(&pool).await.unwrap();
        let path = String::from("/path/to/maps");
        let _set_result = set_maps_dir_path(&pool, path).await;

        let result = get_maps_dir_path(&pool).await;
        let result_unwrapped = result.unwrap();
        println!("result  : {:?}", result_unwrapped);
        assert_eq!(result_unwrapped.len(), 1);
        assert_eq!(result_unwrapped.first().unwrap().id, 1_i32);
        assert_eq!(result_unwrapped.first().unwrap().path, "/path/to/maps");
    }
}
