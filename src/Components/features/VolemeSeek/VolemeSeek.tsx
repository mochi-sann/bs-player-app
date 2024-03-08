import { Slider } from "@/Components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";

export type VolemeSeekProps = {
  handleVolemeSeek: (value: number) => void;
  voleme: number;
};

export const VolemeSeek = (props: VolemeSeekProps) => {
  return (
    <>
      {props.voleme === 0 ? (
        <VolumeX />
      ) : props.voleme < 0.5 ? (
        <Volume1 />
      ) : (
        <Volume2 />
      )}
      <Slider
        max={1}
        min={0}
        step={0.01}
        value={[props.voleme]}
        onValueChange={(e) => props.handleVolemeSeek(e[0])}
      />
    </>
  );
};
