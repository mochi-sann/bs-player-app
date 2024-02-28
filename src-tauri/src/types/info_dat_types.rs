use std::fs::File;
use std::io::BufReader;
use std::path::PathBuf;
use std::{error::Error, path::Path};

use serde::{Deserialize, Serialize};
use serde_json::Value;
use ts_rs::TS;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct BsInfoDat {
    #[serde(rename = "_version")]
    pub version: String,
    #[serde(rename = "_songName")]
    pub song_name: String,
    #[serde(rename = "_songSubName")]
    pub song_sub_name: String,
    #[serde(rename = "_songAuthorName")]
    pub song_author_name: String,
    #[serde(rename = "_levelAuthorName")]
    pub level_author_name: String,
    #[serde(rename = "_beatsPerMinute")]
    pub beats_per_minute: i64,
    #[serde(rename = "_shuffle")]
    pub shuffle: i64,
    #[serde(rename = "_shufflePeriod")]
    pub shuffle_period: f64,
    #[serde(rename = "_previewStartTime")]
    pub preview_start_time: i64,
    #[serde(rename = "_previewDuration")]
    pub preview_duration: i64,
    #[serde(rename = "_songFilename")]
    pub song_filename: String,
    #[serde(rename = "_coverImageFilename")]
    pub cover_image_filename: String,
    #[serde(rename = "_environmentName")]
    pub environment_name: String,
    #[serde(rename = "_allDirectionsEnvironmentName")]
    pub all_directions_environment_name: String,
    #[serde(rename = "_songTimeOffset")]
    pub song_time_offset: i64,
    #[serde(rename = "_customData")]
    pub custom_data: CustomData,
    #[serde(rename = "_difficultyBeatmapSets")]
    pub difficulty_beatmap_sets: Vec<DifficultyBeatmapSet>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct CustomData {
    #[serde(rename = "_editors")]
    pub editors: Editors,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Editors {
    #[serde(rename = "_lastEditedBy")]
    pub last_edited_by: String,
    #[serde(rename = "MMA2")]
    pub mma2: Mma2,
    #[serde(rename = "ChroMapper")]
    pub chro_mapper: ChroMapper,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Mma2 {
    pub version: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ChroMapper {
    pub version: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct DifficultyBeatmapSet {
    #[serde(rename = "_beatmapCharacteristicName")]
    pub beatmap_characteristic_name: String,
    #[serde(rename = "_difficultyBeatmaps")]
    pub difficulty_beatmaps: Vec<DifficultyBeatmap>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct DifficultyBeatmap {
    #[serde(rename = "_difficulty")]
    pub difficulty: String,
    #[serde(rename = "_difficultyRank")]
    pub difficulty_rank: i64,
    #[serde(rename = "_beatmapFilename")]
    pub beatmap_filename: String,
    #[serde(rename = "_noteJumpMovementSpeed")]
    pub note_jump_movement_speed: i64,
    #[serde(rename = "_noteJumpStartBeatOffset")]
    pub note_jump_start_beat_offset: f64,
    #[serde(rename = "_customData")]
    pub custom_data: CustomData2,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct CustomData2 {
    #[serde(rename = "_editorOffset")]
    pub editor_offset: i64,
    #[serde(rename = "_editorOldOffset")]
    pub editor_old_offset: i64,
    #[serde(rename = "_suggestions")]
    pub suggestions: Vec<String>,
    #[serde(rename = "_colorRight")]
    pub color_right: ColorRight,
    #[serde(rename = "_colorLeft")]
    pub color_left: ColorLeft,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ColorRight {
    pub r: f64,
    pub g: f64,
    pub b: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ColorLeft {
    pub r: i64,
    pub g: f64,
    pub b: f64,
}

pub fn load_book_from_json_file<P: AsRef<Path>>(path: P) -> Result<Value, Box<dyn Error>> {
    let file = File::open(path.as_ref())?; // std::io::Error の可能性
    let reader = BufReader::new(file); // 読み込み時は明示的にバッファリング
    let book = serde_json::from_reader(reader)?; // serde_json::Error の可能性
    Ok(book)
}
