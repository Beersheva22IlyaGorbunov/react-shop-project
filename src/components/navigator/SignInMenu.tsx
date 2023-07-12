import { Button, Tab, Tabs } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const SignInMenu = () => {
  return (
      <Tabs>
        <Tab component={Link} to="signin" label="Sign In"/>
        <Tab component={Link} to="signup" label="Sign Up"/>
      </Tabs>
      // <Button variant='contained'>Sign Up</Button>
  )
}

export default SignInMenu