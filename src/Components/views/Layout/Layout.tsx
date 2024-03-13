import { NavBar } from "../NavBar";
import { Button } from "@/Components/ui/button";
import { useI18nContext } from "@/i18n/i18n-react";
import { MapPathHandler } from "@/lib/MapPathHandler";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  const { LL } = useI18nContext();
  const handleClick = async () => {
    console.log("click");
    await MapPathHandler(LL.main["Select Beat Saber Maps Folder"]());
  };
  return (
    <div>
      <NavBar />
      <Button onClick={handleClick}>click</Button>
      <div className="h-[calc(100vh-3rem)] overflow-auto">{props.children}</div>
    </div>
  );
};
