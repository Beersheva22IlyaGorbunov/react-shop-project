import { Box, Button, ButtonGroup} from '@mui/material'
import { Link } from 'react-router-dom'

const SignInMenu = ({ rawPoints }: { rawPoints?: boolean }) => {
  if (rawPoints) {
    return (
      <Box display='flex' flexDirection='column' position='absolute' bottom='0' width='100%'>
        <Button sx={{ borderRadius: 0 }} component={Link} to='signup'>Sign Up</Button>
        <Button sx={{ borderRadius: 0, color: 'white' }} component={Link} to='signin' variant='contained'>Sign In</Button>
      </Box>
    )
  }

  return (
    <ButtonGroup>
      <Button sx={{ borderRadius: 2 }} component={Link} to='signup'>Sign Up</Button>
      <Button sx={{ borderRadius: 2, color: 'white' }} component={Link} to='signin' variant='contained'>Sign In</Button>
    </ButtonGroup>
  )
}

export default SignInMenu
