import { useEffect, useRef } from "react";
import { PlayerStateAtom } from "@/lib/jotai/Player.Jotai";
import { MusicFileListAtomAsync, VolmeAtom } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";

export const useMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioCtx = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const [PlayerState, setPlayerState] = useAtom(PlayerStateAtom);
  const [musicList] = useAtom(MusicFileListAtomAsync);
  const [volume, setVolume] = useAtom(VolmeAtom); // 音量の状態を追加

  // webaudio api を使って再生する

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = PlayerState.selectedSong?.music_file || "";
      console.log("audio!!!!!!!!!!!!!", { audio, PlayerState });
      const ctx = new AudioContext();
      audioCtx.current = ctx;
      gainNode.current = audioCtx.current.createGain();

      audio.addEventListener("loadedmetadata", () => {});
      audio.addEventListener("timeupdate", () => {
        setPlayerState((prev) => {
          return { ...prev, playingSec: audio.currentTime };
        });
      });
      audio.addEventListener("ended", () => {
        SkipForward();
      });

      if (PlayerState.isPlaying) {
        audio.play();
      }
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: PlayerState.selectedSong?.music_name || "",
          artist: PlayerState.selectedSong?.auther || "",
          album: PlayerState.selectedSong?.mapper || "",

          artwork: [
            {
              src: PlayerState.selectedSong?.image || "",
            },
          ],
        });
      }
    }
  }, [PlayerState.selectedSong?.id]);

  const playAndPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (PlayerState.isPlaying) {
        audio.pause();
        setPlayerState((prev) => {
          return { ...prev, isPlaying: false };
        });
      } else {
        audio.play();
        setPlayerState((prev) => {
          return { ...prev, isPlaying: true };
        });
      }
    }
  };
  const setVolumeSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value;
      setVolume(value);
    }
  };

  const SkipForward = () => {
    setPlayerState((prev) => {
      return {
        ...prev,
        selectedSong: musicList.data[(PlayerState.selectedSong?.id || 0) + 1],
      };
    });
  };
  const SkipBack = () => {
    setPlayerState((prev) => {
      return {
        ...prev,
        selectedSong: musicList.data[(PlayerState.selectedSong?.id || 0) + 1],
      };
    });
  };
  const seek = (value: number) => {
    console.log("seek", value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setPlayerState((prev) => {
        return { ...prev, playingSec: value };
      });
    }
  };

  // };
  // const handleMouseDown = () => {
  //   setSeeking(true);
  //   console.log("mouse down");
  // };
  // const handleMouseUp = () => {
  //   console.log("mouse up");

  //   AudioRef.seekTo(PlayerState.playingSec);

  //   setSeeking(false);
  // };

  return {
    seek,
    playAndPause,
    PlayerState,
    setPlayerState,
    SkipBack,
    SkipForward,
    audioRef,
    volume,
    setVolumeSeek,
  };
};
