import { dialog } from "@tauri-apps/api";
import { homeDir, resolve } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/tauri";
import { MapsDirPath } from "src-tauri/bindings/MapsDirPath";

type MapPathHandlerType = {
  status: boolean;
  path: string;
};

export const MapPathHandler = async (dialogTitle: string) => {
  const MapPathss = await haveMapPath();
  if (MapPathss.status) {
    return MapPathss.path;
  } else {
    return await setMapPath(dialogTitle);
  }
};

export const haveMapPath = async (): Promise<MapPathHandlerType> => {
  const MapPathss: Array<MapsDirPath> = await invoke("handle_get_bs_maps");
  if (MapPathss.length > 0) {
    return { status: true, path: MapPathss[0].path };
  } else {
    return { status: false, path: "" };
  }
};
export const setMapPath = async (dialogTitle: string) => {
  const bsmDefultPath = await resolve(
    await homeDir(),
    "BSManager",
    "SharedContent",
    "SharedMaps",
    "CustomLevels",
  );

  const MapPaths = await invoke("folder_exists", {
    folderPath: bsmDefultPath,
  });
  let defaultPath = "";
  if (MapPaths) {
    defaultPath = bsmDefultPath;
  } else {
    defaultPath = await homeDir();
  }
  const dialogOption: dialog.OpenDialogOptions = {
    title: dialogTitle,
    directory: true,
    defaultPath: defaultPath,
    multiple: false,
  };
  const result = await dialog.open(dialogOption);
  await invoke("handle_set_bs_maps_path", {
    path: result,
  });

  return result;
};
