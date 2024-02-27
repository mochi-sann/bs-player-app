use std::fs;

#[tauri::command]
pub fn get_bs_music_files() -> Vec<String> {
  let mut bs_dir_list: Vec<String> = Vec::new();
  let get_dir_path = "C:\\Users\\mochi\\BSManager\\SharedContent\\SharedMaps\\CustomLevels\\Jaroslav Beck - Beat Saber (Built in)".to_string();
  let paths = fs::read_dir(get_dir_path).unwrap();

  for path in paths {
    let path = path.unwrap().path();
    let file_name = path.file_name().unwrap().to_str().unwrap().to_string();
    println!("{}", file_name);
    bs_dir_list.push(file_name);
  }


  bs_dir_list
}