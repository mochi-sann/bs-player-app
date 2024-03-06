import { SongData } from "../../../src-tauri/bindings/SongData";
import { F7PlayFill } from "../icons/F7PlayFill";
import { Fa6RegularImage } from "../icons/Fa6RegularImage";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { useI18nContext } from "@/i18n/i18n-react";
import { formatTime } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useHover } from "@uidotdev/usehooks";

type MusicItemProps = {
  MusicItem: SongData;
  id: number;
  onclick: (id: number) => void;
};
export const MusicItem = (props: MusicItemProps) => {
  const [ref, hovered] = useHover();

  const { LL } = useI18nContext();
  return (
    <div
      ref={ref}
      className="justify-flex-start align-center wrap-wrap flex flex-1 flex-row gap-5 rounded-sm p-3 duration-100 hover:bg-gray-100/10"
    >
      <div className="flex w-[30px] items-center justify-center ">
        {hovered ? (
          <Button
            aria-label={LL.play_music()}
            size={"icon"}
            variant={"ghost"}
            onClick={() => props?.onclick(props.id)}
          >
            <F7PlayFill height={32} width={32} />
          </Button>
        ) : (
          <p>{props.id}</p>
        )}
      </div>
      <Center>
        <Avatar rounded={"none"} className="rounded">
          <AvatarImage src={props.MusicItem.image} alt="avatar" />
          <AvatarFallback>
            <Fa6RegularImage height={32} width={32} />
          </AvatarFallback>
        </Avatar>
      </Center>
      <div className="align-center flex flex-col justify-center gap-0">
        <p className="text-xl  font-bold">{props.MusicItem.music_name}</p>
        <p className="text-sm">{props.MusicItem.auther}</p>
      </div>
      <div className=" flex flex-1 justify-end gap-14 px-4">
        <div className="flex w-16 items-center justify-end">
          <p
            style={{
              fontSize: 12,
              fontFamily: "Inter",
              fontWeight: "300",
              wordWrap: "break-word",
            }}
          >
            {props.MusicItem.mapper}
          </p>
        </div>
        <div className="flex w-16 items-center justify-end">
          <p
            style={{
              fontSize: 12,
              fontFamily: "Inter",
              fontWeight: "300",
              wordWrap: "break-word",
            }}
          >
            {formatTime(props.MusicItem.length_of_music_sec)}
          </p>
        </div>
      </div>
    </div>
  );
};
