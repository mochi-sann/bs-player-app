import { dialog } from "@tauri-apps/api";
import { homeDir, resolve } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/tauri";
import { MapsDirPath } from "src-tauri/bindings/MapsDirPath";

export const MapPathHandler = async (dialogTItle: string) => {
  const MapPathss: Array<MapsDirPath> = await invoke("handle_get_bs_maps");
  let bsmDefultPath = await resolve(
    await homeDir(),
    "BSManager",
    "SharedContent",
    "SharedMaps",
    "CustomLevels",
  );
  console.log({ MapPathss });
  // C:\Users\mochi\BSManager\SharedContent\SharedMaps\CustomLevels
  const MapPaths = await invoke("folder_exists", {
    folderPath: bsmDefultPath,
  });
  let defaultPath = "";
  if (MapPaths) {
    defaultPath = bsmDefultPath;
  } else {
    defaultPath = await homeDir();
  }
  if (MapPathss.length > 0) {
    return MapPathss[0].path;
  } else {
    const dialogOption: dialog.OpenDialogOptions = {
      title: dialogTItle,
      directory: true,
      defaultPath: bsmDefultPath,
      multiple: false,
    };
    const result = await dialog.open(dialogOption);
    await invoke("handle_set_bs_maps_path", {
      path: result,
    });
  }
};
