import { Button } from "@/Components/ui/button";
import { useMapPathHook } from "@/hooks/useMapPathHook";
import { useI18nContext } from "@/i18n/i18n-react";

export const Setup = () => {
  const { LL } = useI18nContext();
  const { data, setMapUrl } = useMapPathHook();

  return (
    <div>
      <p>setup map path</p>
      <pre>{JSON.stringify(data)}</pre>
      <Button onClick={setMapUrl}>
        {LL.main["Select Beat Saber Maps Folder"]()}
      </Button>
    </div>
  );
};

export default Setup;
