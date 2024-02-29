// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CustomData } from "./CustomData";
import type { DifficultyBeatmapSet } from "./DifficultyBeatmapSet";

export interface BsInfoDat {
  _version: string;
  _songName: string;
  _songSubName: string;
  _songAuthorName: string;
  _levelAuthorName: string;
  _beatsPerMinute: bigint;
  _shuffle: bigint;
  _shufflePeriod: number;
  _previewStartTime: bigint;
  _previewDuration: bigint;
  _songFilename: string;
  _coverImageFilename: string;
  _environmentName: string;
  _allDirectionsEnvironmentName: string;
  _songTimeOffset: bigint;
  _customData: CustomData | null;
  _difficultyBeatmapSets: Array<DifficultyBeatmapSet> | null;
}
