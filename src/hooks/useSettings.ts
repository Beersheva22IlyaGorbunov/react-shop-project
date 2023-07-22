import { useEffect, useState } from 'react'
import HomePageSettings from '../model/settings/HomePageSettings'
import { settingService } from '../config/servicesConfig'
import { useDispatch } from 'react-redux'
import { settingsActions } from '../redux/slices/SettingsSlice'

const useSettings = () => {
  const [settings, setSettings] = useState<HomePageSettings>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    setError('')
    settingService
      .getHome()
      .then((res) => {
        setSettings(res)
        dispatch(settingsActions.set(res))
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return [isLoading, error, settings]
}

export default useSettings
