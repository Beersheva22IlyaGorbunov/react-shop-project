import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { Alert, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Login } from '@mui/icons-material'
import LoginData from '../../model/service/LoginData'
import ActionResult from '../../model/ActionResult'

interface Props {
  onSignIn: (provider: string, loginData: LoginData) => Promise<ActionResult>
}

export const SignInForm: React.FC<Props> = ({ onSignIn }) => {
  const [loginRes, setLoginRes] = useState<ActionResult | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    if (typeof email === 'string' && typeof password === 'string') {
      const loginData: LoginData = {
        email,
        password
      }
      const res = await onSignIn('email', loginData)
      setLoginRes(res)
      setIsLoading(false)
    }
  }

  return (
    <Container disableGutters component='main' maxWidth='xs'>
      <CssBaseline />
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onChange={() => setLoginRes(undefined)} onSubmit={handleSubmit} noValidate>
          <TextField
            margin='normal'
            required
            fullWidth
            size='small'
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            size='small'
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <LoadingButton
            type='submit'
            fullWidth
            loading={isLoading}
            endIcon={<Login />}
            loadingPosition='end'
            variant='contained'
            sx={{ my: 2 }}
          >
            Sign In
          </LoadingButton>
          {(loginRes != null) && <Alert severity={loginRes.status}>{loginRes.message}</Alert>}
        </Box>
      </Stack>
    </Container>
  )
}

export default SignInForm
