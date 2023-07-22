import { Box, Button, SxProps } from '@mui/material'
import React from 'react'

interface Props {
  count: number
  sx?: SxProps
  fullWidth?: boolean
  onClick: (newValue: number) => void
}

const AddToCartButton: React.FC<Props> = ({ count, sx, fullWidth = false, onClick }) => {
  return count === 0
    ? (
      <Button onClick={() => onClick(1)} variant='outlined' fullWidth={fullWidth} sx={{ textAlign: 'center', ...sx }}>
        Add to cart
      </Button>
      )
    : (
      <Box
        sx={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'primary.main',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: fullWidth ? '100%' : '130px',
          height: 'min-content',
          ...sx
        }}
      >
        <Button sx={{ my: '-1px' }} onClick={() => onClick(count - 1)}>-</Button>
        {count}
        <Button sx={{ my: '-1px' }} onClick={() => onClick(count + 1)}>+</Button>
      </Box>
      )
}

export default AddToCartButton
