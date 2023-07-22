import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { settingService } from '../../config/servicesConfig'
import RootState from '../../model/redux/RootState'
import { useSelector } from 'react-redux'
import { Settings } from '../../model/redux/SettingsState'
import useCodeTypeDispatch from '../../hooks/useCodeTypeDispatch'
import ImagePreview from '../ImagePreview'

const GeneralSettingTab = () => {
  const savedSettings = useSelector(
    (state: RootState) => state.settingsState.settings
  )
  const codeTypeDispatch = useCodeTypeDispatch()
  const [settings, setSettings] = useState<Settings>(savedSettings!)
  const [bannerFile, setBannerFile] = useState<File>()

  useEffect(() => {
    setSettings(savedSettings!)
  }, [savedSettings])

  function handleBannerUrlChange (e: React.ChangeEvent<HTMLInputElement>) {
    const bannerUrl = e.target.value
    setSettings((settings) => ({ ...settings, bannerUrl }))
  }

  function handleFilesChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files instanceof FileList) {
      setBannerFile(Array.from(e.currentTarget.files)[0])
    } else {
      setBannerFile(undefined)
    }
  }

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = {
      success: '',
      error: ''
    }
    try {
      await settingService.set(
        {
          ...settings
        },
        bannerFile
      )
      res.success = 'Settings were updated successfully'
    } catch (e: any) {
      if (typeof e === 'string') {
        res.error = e
      } else {
        res.error = e.message
      }
    }
    codeTypeDispatch(res.success, res.error)
  }

  if (!settings) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant='h5' mb={2}>
          General settings
        </Typography>
        <CircularProgress sx={{ display: 'block', mx: 'auto' }} />
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h5' mb={2}>
        General settings
      </Typography>
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size='small'
              label='Title'
              variant='outlined'
              value={settings.title}
              onChange={(e) =>
                setSettings((settings) => ({
                  ...settings,
                  title: e.target.value
                }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size='small'
              label='Subtitle'
              variant='outlined'
              value={settings.subtitle}
              onChange={(e) =>
                setSettings((settings) => ({
                  ...settings,
                  subtitle: e.target.value
                }))}
            />
          </Grid>
          <Grid item hidden={!!settings.bannerUrl} xs={(bannerFile != null) ? 12 : 5}>
            <Button variant='contained' fullWidth component='label'>
              Upload banner
              <input
                onChange={handleFilesChange}
                accept='image/png, image/jpeg'
                name='images'
                type='file'
                hidden
                required={!settings.bannerUrl}
              />
            </Button>
          </Grid>
          {(bannerFile == null) && !settings.bannerUrl && (
            <Grid item xs={2} textAlign='center'>
              <Typography height='100%' pt={1}>
                OR
              </Typography>
            </Grid>
          )}
          <Grid item hidden={!(bannerFile == null)} xs={settings.bannerUrl ? 12 : 5}>
            <TextField
              fullWidth
              required={bannerFile == null}
              size='small'
              label='Banner link'
              variant='outlined'
              value={settings.bannerUrl}
              onChange={handleBannerUrlChange}
            />
          </Grid>
        </Grid>
        {((bannerFile != null) || settings.bannerUrl) && (
          <Grid item xs={12} mt={2}>
            <ImagePreview
              link={
                (bannerFile != null)
                  ? URL.createObjectURL(bannerFile)
                  : settings.bannerUrl
              }
              onDelete={() => {
                if (bannerFile != null) {
                  setBannerFile(undefined)
                } else {
                  setSettings((settings) => ({ ...settings, bannerUrl: '' }))
                }
              }}
            />
          </Grid>
        )}

        <Button variant='contained' type='submit' sx={{ mt: 2, color: 'white' }}>
          Save
        </Button>
      </Box>
    </Paper>
  )
}

export default GeneralSettingTab
