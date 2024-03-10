-- Add migration script here
CREATE TABLE IF NOT EXISTS masps_pash (
id INTEGER PRIMARY KEY  AUTOINCREMENT,
path TEXT NOT NULL,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);