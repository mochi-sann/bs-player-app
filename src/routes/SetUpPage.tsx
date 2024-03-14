import { Suspense } from "react";
import { Setup } from "@/Components/pages/Setup";
import { Center } from "@/Components/ui/center";
import { Loading } from "@/Components/views/Loading";

export const SetUpPage = () => {
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
          <Setup />
        </Suspense>
      </div>
    </>
  );
};
export default SetUpPage;
