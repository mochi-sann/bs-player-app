import { useI18nContext } from "@/i18n/i18n-react";
import { setMapPath } from "@/lib/MapPathHandler";
import { MapPathAtomAsync } from "@/lib/jotai/jotai";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const useMapPathHook = () => {
  const { LL } = useI18nContext();
  const [{ data, isPending, refetch }] = useAtom(MapPathAtomAsync);
  const navigate = useNavigate();

  const setMapUrl = async () => {
    await setMapPath(LL.main["Select Beat Saber Maps Folder"]());
    refetch();
    navigate("/");
  };

  return { data, isPending, setMapUrl };
};
