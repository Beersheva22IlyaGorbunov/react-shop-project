interface SettingsState {
  settings?: Settings
}

export interface Settings { title: string, subtitle: string, bannerUrl: string }

export default SettingsState
