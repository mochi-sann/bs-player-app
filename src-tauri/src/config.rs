use std::{fmt, fs, mem, sync::Mutex};

use serde::{Deserialize, Serialize};
use std::io::Write;

use crate::database::db::get_confg_root;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Settings {
    language: String,
    theme: String,
}

impl Settings {
    pub fn new() -> Self {
        let config_file = get_confg_root().join(SETTINGS_FILENAME);
        if !config_file.exists() {
            Self::default()
        } else {
            let mut settings = Self::default();
            settings.read_file();
            settings
        }
    }
    pub fn set_language(&mut self, new_lang: String) {
        self.language = new_lang;
        self.write_file();
    }

    pub fn set_theme(&mut self, new_theme: String) {
        self.theme = new_theme;
        self.write_file();
    }
}

impl Default for Settings {
    fn default() -> Self {
        Settings {
            language: "en".to_string(),
            theme: "dark".to_string(),
        }
    }
}
impl fmt::Display for Settings {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Implement the formatting logic for the Settings struct here
        // For example, you can use write!(f, "Settings: {:?}", self) to use the debug format
        // Or you can customize the output format as per your requirements
        // Make sure to return the fmt::Result
        write!(f, "Settings: {:?}", self)
    }
}

trait Config {
    fn write_file(&self) {}
    fn read_file(&mut self) {}
}

const SETTINGS_FILENAME: &str = "bs_settings.json";

impl Config for Settings {
    fn write_file(&self) {
        let config_file = get_confg_root().join(SETTINGS_FILENAME);
        if !config_file.parent().unwrap().exists() {
            fs::create_dir_all(config_file.parent().unwrap()).unwrap();
        }

        let serialized = serde_json::to_string(self).unwrap();
        let mut file = fs::File::create(config_file).unwrap();
        file.write_all(serialized.as_bytes()).unwrap();
    }

    fn read_file(&mut self) {
        let config_file = get_confg_root().join(SETTINGS_FILENAME);

        let input = fs::read_to_string(config_file).unwrap();
        let deserialized: Self = serde_json::from_str(&input).unwrap();
        let _ = mem::replace(self, deserialized);
    }
}

#[derive(Debug)]
pub struct AppState {
    settings: Mutex<Settings>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            settings: Mutex::from(Settings::new()),
        }
    }
}

pub mod commands {
    use super::*;

    #[tauri::command]
    pub async fn set_language(
        state: tauri::State<'_, AppState>,
        new_language: String,
    ) -> Result<(), String> {
        let mut settings = state.settings.lock().unwrap();
        settings.set_language(new_language);
        Ok(())
    }

    #[tauri::command]
    pub async fn set_theme(
        state: tauri::State<'_, AppState>,
        new_theme: String,
    ) -> Result<(), String> {
        let mut settings = state.settings.lock().unwrap();
        settings.set_theme(new_theme);
        Ok(())
    }
    #[tauri::command]
    pub async fn get_settings(
        state: tauri::State<'_, AppState>
    )-> Result<Settings, String> {
        let settings = state.settings.lock().unwrap().clone();
        Ok(settings)
    }

}
