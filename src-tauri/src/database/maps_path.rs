use sqlx::{Sqlite, SqlitePool, Transaction};

use super::db::DbResult;


pub async fn set_maps_dir_path(pool: &SqlitePool, path: String) -> DbResult<()> {
  // トランザクションを開始する
  // cardsテーブルにカードを挿入する
  sqlx::query("INSERT INTO masps_pash (path) VALUES (?)")
    .bind(path)
    .execute(pool)
    .await?;



  Ok(())
}
