import React from "react";
import { SongData } from "../../../src-tauri/bindings/SongData";
import { MusicItem } from "./MusicItem";

type MusicListProps = {
  MusicList: SongData[];
};
export const MusicList = (props: MusicListProps) => {
  return (
    <div className="flex-col divide-dashed">
      {props.MusicList.map((music, key) => (
        <React.Fragment key={key}>
          <MusicItem MusicItem={music} id={key} />
        </React.Fragment>
      ))}
    </div>
  );
};
