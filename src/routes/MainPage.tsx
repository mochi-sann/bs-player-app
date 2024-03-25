import { Suspense } from "react";
import { MusicPlayer } from "@/Components/features/MusicPlayer";
import { Center } from "@/Components/ui/center";
import { Loading } from "@/Components/views/Loading";

export const Component = () => {
  return (
    <>
      <div className="container">
        <Suspense
          fallback={
            <Center>
              <Loading />
            </Center>
          }
        >
          <MusicPlayer />
        </Suspense>
      </div>
    </>
  );
};
Component.displayName = "MainPage";
