import HomePageSettings from '../model/settings/HomePageSettings'

export default interface SettingsService {
  setHome: (settings: HomePageSettings, image?: File) => Promise<void>
  getHome: () => Promise<HomePageSettings>
}
