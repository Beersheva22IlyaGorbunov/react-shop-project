import { Box, Button, Modal, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../redux/slices/AuthSlice'

const style = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  borderRadius: 3,
  bgcolor: 'background.paper',
  border: '2px solid',
  borderColor: 'error.main',
  boxShadow: 24,
  p: 4
}

const SignOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogOut (): void {
    dispatch(signOut())
  }

  return (
    <Modal
      open
      onClose={() => navigate(-1)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Sign out
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Are you sure, that you want to sign out?
        </Typography>
        <Button onClick={handleLogOut} sx={{ mt: 2 }} variant='outlined' color='error'>Logout</Button>
      </Box>
    </Modal>
  )
}

export default SignOut
