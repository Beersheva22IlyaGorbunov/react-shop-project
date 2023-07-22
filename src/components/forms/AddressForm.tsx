import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { MutableRefObject, useState } from 'react'
import Address from '../../model/Address'

interface Props {
  initial?: Address
  required?: boolean
  hideButton?: boolean
  formRef?: MutableRefObject<HTMLFormElement | undefined>
  onChange?: (address: Address) => void
  onSubmit?: (address: Address) => Promise<void>
}

const emptyAddress: Address = {
  country: '',
  city: '',
  street: '',
  building: '',
  flat: 0
}

const AddressForm: React.FC<Props> = ({
  initial = emptyAddress,
  formRef,
  required = false,
  hideButton = false,
  onChange,
  onSubmit
}) => {
  const [address, setAddress] = useState<Address>(initial)

  const handleFieldChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({
        ...prev,
        [field]: e.target.value
      }))
    }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Submit')
    onSubmit != null && onSubmit(address).catch((e) => console.log(e))
  }

  function handleChange () {
    onChange != null && onChange(address)
  }

  return (
    <Box
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={handleChange}
      component='form'
    >
      <Typography variant='h5' mb={2}>
        {initial !== emptyAddress ? 'Edit' : 'Add'} address
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            margin='dense'
            fullWidth
            required={required}
            size='small'
            label='Country'
            onChange={handleFieldChange('country')}
            value={address.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin='dense'
            fullWidth
            required={required}
            size='small'
            label='City'
            onChange={handleFieldChange('city')}
            value={address.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin='dense'
            fullWidth
            required={required}
            size='small'
            label='Street'
            onChange={handleFieldChange('street')}
            value={address.street}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin='dense'
            fullWidth
            required={required}
            size='small'
            label='Building'
            onChange={handleFieldChange('building')}
            value={address.building}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin='dense'
            fullWidth
            required={required}
            size='small'
            label='Flat'
            onChange={handleFieldChange('flat')}
            value={address.flat}
          />
        </Grid>
      </Grid>
      {!hideButton && (
        <Button
          type='submit'
          variant='contained'
          sx={{ ml: 'auto', display: 'block', color: 'white' }}
        >
          Submit
        </Button>
      )}
    </Box>
  )
}

export default AddressForm
