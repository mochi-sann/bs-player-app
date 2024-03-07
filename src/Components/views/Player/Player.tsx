import { Fa6RegularImage } from "@/Components/icons/Fa6RegularImage";
import { Button } from "@/Components/ui/button";
import { Center } from "@/Components/ui/center";
import { Slider } from "@/Components/ui/slider";
import { SongDataType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { createPortal } from "react-dom";

type PlayerProps = {
  SkipForward: () => void;
  SkipBack: () => void;
  PlayAndPause: () => void;
  seek: (passdSec: number) => void;
  playing: boolean;
  max: number;
  playingSec: number;
  SongData: SongDataType | null;
};
const PlayerContetWrapper = (props: { children: React.ReactNode }) => {
  return <div className="w-full">{props.children}</div>;
};

export const Player = (props: PlayerProps) => {
  return (
    <div className="h-[97px]">
      {createPortal(
        <div className="absolute bottom-0 left-0 flex w-full rounded-t-lg border bg-card/90 px-8 py-4 backdrop-blur">
          <PlayerContetWrapper>
            {props.SongData && (
              <div className="flex flex-row gap-2">
                <Center>
                  <Avatar className="h-10 w-10 rounded">
                    <AvatarImage
                      src={props.SongData.image}
                      alt="avatar"
                      loading="lazy"
                    />
                    <AvatarFallback>
                      <Fa6RegularImage height={32} width={32} />
                    </AvatarFallback>
                  </Avatar>
                </Center>
                <div className="align-center flex flex-col justify-center gap-0">
                  <p className="text-xl  font-bold">
                    {props.SongData.music_name}
                  </p>
                  <p className="text-sm">{props.SongData.auther}</p>
                </div>
              </div>
            )}
          </PlayerContetWrapper>
          <PlayerContetWrapper>
            <div className="  max-w-[40rem] flex-col gap-4">
              <div className="flex w-full items-center justify-center">
                <Button
                  onClick={props.SkipBack}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <SkipBack />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={props.PlayAndPause}
                >
                  {!props.playing ? <Play /> : <Pause />}
                </Button>
                <Button
                  onClick={props.SkipForward}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <SkipForward />
                </Button>
              </div>

              <Slider
                className=""
                max={props.max}
                step={0.01}
                value={[props.playingSec]}
                onValueChange={(value) => props.seek(value[0])}
              />
            </div>
          </PlayerContetWrapper>
          <PlayerContetWrapper>
            <div></div>
          </PlayerContetWrapper>
        </div>,
        document.body,
      )}
    </div>
  );
};
