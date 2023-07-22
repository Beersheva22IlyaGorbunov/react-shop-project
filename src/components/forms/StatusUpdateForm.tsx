import React, { useRef, useState } from 'react'
import Order, { OrderStatus } from '../../model/Order'
import AddressForm from './AddressForm'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import orderConfig from '../../config/orderConfig.json'
const { statuses } = orderConfig

interface Props {
  initial: Order
  onSubmit: (newStatus: OrderStatus) => Promise<void>
}

const StatusUpdateForm: React.FC<Props> = ({ initial, onSubmit }) => {
  const [status, setStatus] = useState<OrderStatus>(initial.statuses[0]!.status)

  return (
    <>
      <Typography variant='h5'>Update status</Typography>
      <FormControl
        required
        // variant="standard"
        margin='dense'
        fullWidth
        size='small'
      >
        <InputLabel id='category-label'>Status</InputLabel>
        <Select
          labelId='category-label'
          required
          value={status}
          label='category'
          name='category'
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
        >
          {Object.entries(statuses).map(([statusCode, status]) => {
            return (
              <MenuItem key={status} value={statusCode}>
                {status}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Button onClick={async () => await onSubmit(status)} variant="contained"
          sx={{ ml: "auto", display: "block", color: "white" }}>Submit</Button>
    </>
  )
}

export default StatusUpdateForm
