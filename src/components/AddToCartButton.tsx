import { AddShoppingCart } from '@mui/icons-material'
import { Box, Button, SxProps, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface Props {
  count: number
  sx?: SxProps
  fullWidth?: boolean
  onClick: (newValue: number) => void
}

const AddToCartButton: React.FC<Props> = ({ count, sx, fullWidth = false, onClick }) => {
  const theme = useTheme()
  const isVeryNarrow = useMediaQuery(theme.breakpoints.down(360))

  return count === 0
    ? (
      <Button startIcon={isVeryNarrow ? <AddShoppingCart sx={{margin: 0}} /> : null} onClick={() => onClick(1)} variant='outlined' fullWidth={fullWidth} sx={{ "& .MuiButton-startIcon": { margin: "0px" }, minWidth:0 ,textAlign: 'center', ...sx }}>
        {!isVeryNarrow && "Add to cart"}
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
          justifyContent: 'space-around',
          alignItems: 'center',
          width: fullWidth ? '100%' : '130px',
          height: 'min-content',
          ...sx
        }}
      >
        <Button sx={{ my: '-1px', minWidth: 0 }} onClick={() => onClick(count - 1)}>-</Button>
        {count}
        <Button sx={{ my: '-1px', minWidth: 0 }} onClick={() => onClick(count + 1)}>+</Button>
      </Box>
      )
}

export default AddToCartButton
