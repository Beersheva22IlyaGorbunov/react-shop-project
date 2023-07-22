import { Close } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

interface Props {
  link: string
  onDelete?: () => void
}

const ImagePreview: React.FC<Props> = ({ link, onDelete }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
        backgroundImage: `url(${link})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100px',
        height: '120px'
      }}
    >
      {(onDelete != null) && (
        <IconButton
          onClick={onDelete}
          size='small'
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            backgroundColor: 'white',
            opacity: 0.6,
            '&:hover': { backgroundColor: 'white', opacity: 1 }
          }}
        >
          <Close color='error' />
        </IconButton>
      )}
    </Box>
  )
}

export default ImagePreview
