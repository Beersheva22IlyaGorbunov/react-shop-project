import { useEffect, useState } from "react";
import HomePageSettings from "../model/settings/HomePageSettings";
import { settingService } from "../config/servicesConfig";

const useSettings = () => {
  const [settings, setSettings] = useState<HomePageSettings>();

  useEffect(() => {
    settingService.getHome().then((res) => {
      setSettings(res);
    })
  }, [])

  return settings;
}

export default useSettings;
