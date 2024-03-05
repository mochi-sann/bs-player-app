import { SongData } from "../../../src-tauri/bindings/SongData";
import { F7PlayFill } from "../icons/F7PlayFill";
import { Fa6RegularImage } from "../icons/Fa6RegularImage";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useHover } from "@uidotdev/usehooks";

type MusicItemProps = {
  MusicItem: SongData;
  id: number;
  onclick: (id: number) => void;
};
export const MusicItem = (props: MusicItemProps) => {
  const [ref, hovered] = useHover();

  return (
    <div
      ref={ref}
      className="p-3 gap-5 justify-flex-start align-center flex wrap-wrap flex-1 flex-row hover:bg-gray-100/10 duration-100 rounded-sm"
    >
      <div className="w-[30px] flex justify-center items-center ">
        {hovered ? (
          <Button
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
      <div className="flex flex-col justify-center align-center gap-0">
        <p className="font-bold  font-md">{props.MusicItem.music_name}</p>
        <p className="font-sm">{props.MusicItem.auther}</p>
      </div>
      <div className=" flex justify-end flex-1 gap-14">
        <div className="flex justify-center items-center">
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
      </div>
    </div>
  );
};
