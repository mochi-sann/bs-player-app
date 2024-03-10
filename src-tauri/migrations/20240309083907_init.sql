CREATE TABLE IF NOT EXISTS `songs` (
  `id` INTEGER  PRIMARY KEY AUTOINCREMENT,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP,
  `music_file` TEXT not null,
  `music_name` TEXT not null,
  `music_dir` varchar(255) not null,
  `auther` TEXT not null,
  `image` TEXT not null,
  `length_of_music_sec` INTEGER not null,
  `length_of_music_millisec` INTEGER not null
)