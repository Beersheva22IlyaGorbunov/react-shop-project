import { useEffect, useState } from 'react'
import { settingService } from '../config/servicesConfig'
import { Settings } from '../model/redux/SettingsState'

const useSettings = (): [boolean, string, Settings?] => {
  const [settings, setSettings] = useState<Settings>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState('')
  

  useEffect(() => {
    setLoading(true)
    setError('')
    settingService
      .get()
      .then((res) => {
        setSettings(res)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return [isLoading, error, settings]
}

export default useSettings
