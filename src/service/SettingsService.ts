import HomePageSettings from "../model/settings/HomePageSettings";

export default interface SettingsService {
  setHome(setting: HomePageSettings): Promise<void>
}