import { Button } from "@/Components/ui/button";
import { Slider } from "@/Components/ui/slider";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

type PlayerProps = {
  SkipForward: () => void;
  SkipBack: () => void;
  PlayAndPause: () => void;
  seek: (passdSec: number[]) => void;
  playing: boolean;
  slider: {
    max: number;
    playingSec: number;
  };
};

export const Player = (props: PlayerProps) => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex w-full items-center justify-center">
        <Button onClick={props.SkipBack} variant={"ghost"} size={"icon"}>
          <SkipBack />
        </Button>
        <Button variant={"ghost"} size={"icon"} onClick={props.PlayAndPause}>
          {props.playing ? <Play /> : <Pause />}
        </Button>
        <Button onClick={props.SkipForward} variant={"ghost"} size={"icon"}>
          <SkipForward />
        </Button>
      </div>

      <Slider
        max={props.slider.max}
        step={1}
        value={[props.slider.playingSec]}
        onValueChange={(value) => props.seek(value)}
      />
    </div>
  );
};
