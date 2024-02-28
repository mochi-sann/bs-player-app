// export type SongDataType = {
//   music_file: string;
//   music_name: string;
//   music_dir: string;
// };

import { SongData } from "../../src-tauri/bindings/SongData";

export type SongDataType = SongData;

export type selectListOptionType = { value: string; label: string };
