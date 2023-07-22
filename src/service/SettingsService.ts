import { Settings } from '../model/redux/SettingsState'

export default interface SettingsService {
  set: (settings: Settings, image?: File) => Promise<void>
  get: () => Promise<Settings>
}
