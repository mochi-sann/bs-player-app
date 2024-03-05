import React from "react";
import { SongData } from "../../../src-tauri/bindings/SongData";
import { MusicItem } from "./MusicItem";

type MusicListProps = {
  MusicList: SongData[];
  onClick?: (id: number) => void;
};
export const MusicList = (props: MusicListProps) => {
  const clickButton = (id: number) => {
    console.log("clicked", id);
    if (props.onClick) {
      props.onClick(id);
    }
  };
  return (
    <div className="flex-col divide-dashed">
      {props.MusicList.map((music, key) => (
        <React.Fragment key={key}>
          <MusicItem onclick={clickButton} MusicItem={music} id={key} />
        </React.Fragment>
      ))}
    </div>
  );
};
