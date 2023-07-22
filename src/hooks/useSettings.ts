import { useEffect, useState } from 'react'
import { settingService } from '../config/servicesConfig'
import { Settings } from '../model/redux/SettingsState'

const useSettings = (): [Settings | undefined, boolean, string] => {
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

  return [settings, isLoading, error]
}

export default useSettings
