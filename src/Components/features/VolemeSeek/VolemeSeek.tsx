import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Slider } from "@/Components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";

export type VolemeSeekProps = {
  handleVolemeSeek: (value: number) => void;
  voleme: number;
};

export const VolemeSeek = (props: VolemeSeekProps) => {
  const [LastVolme, setLastVolme] = useState(0);

  const handleMusicVoleme = () => {
    if (props.voleme === 0) {
      props.handleVolemeSeek(LastVolme);
    } else {
      setLastVolme(props.voleme);
      props.handleVolemeSeek(0);
    }
  };
  return (
    <>
      <Button
        onClick={handleMusicVoleme}
        variant={"ghost"}
        size={"icon"}
        type="button"
      >
        {props.voleme === 0 ? (
          <VolumeX />
        ) : props.voleme < 0.5 ? (
          <Volume1 />
        ) : (
          <Volume2 />
        )}
      </Button>
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
