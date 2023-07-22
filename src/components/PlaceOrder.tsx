import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddressForm from './forms/AddressForm'
import PaymentForm from './forms/PaymentForm'
import Review from './OrderReview'
import Address from '../model/Address'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch
} from '@mui/material'
import { useRef, useState } from 'react'
import ProductQuantity from '../model/ProductQuantity'
import useClient from '../hooks/useClient'
import Order from '../model/Order'
import { isDebuggerStatement } from 'typescript'
import OrderReview from './OrderReview'
import { cartService, clientService, orderService } from '../config/servicesConfig'
import Client from '../model/Client'

const steps = ['Shipping address', 'Payment details', 'Review your order']

interface Props {
  orderProducts: ProductQuantity[]
  clientId: string
  onModalClose: () => void
}

function getBaseOrder (clientId: string, products: ProductQuantity[]): Order {
  return {
    clientId,
    products,
    isDelivery: false,
    statuses: []
  }
}

const FirstStep: React.FC<{
  isDelivery: boolean
  isSaved: boolean
  toggleSaveAddress: (isSaved: boolean) => void
  setDeliveryFn: (isDelivery: boolean) => void
  renderAddressForm: () => JSX.Element
}> = ({ isDelivery, isSaved, toggleSaveAddress, setDeliveryFn, renderAddressForm }) => {
  function toggleDelivery (checked: boolean) {
    setDeliveryFn(checked)
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isDelivery}
              onChange={(__, checked) => toggleDelivery(checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label='Delivery'
        />
      </FormGroup>
      {isDelivery && (
        <>
          {renderAddressForm()}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSaved}
                  onChange={(__, checked) => toggleSaveAddress(checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label='Save this address for future deliveries?'
            />
          </FormGroup>
        </>
      )}
    </>
  )
}

export default function Checkout ({
  orderProducts,
  clientId,
  onModalClose
}: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [order, setOrder] = useState(getBaseOrder(clientId, orderProducts))
  const [isLoading, error, client] = useClient(clientId)
  const addressFormRef = useRef<HTMLFormElement>()
  const [saveAddress, setSaveAddress] = useState<boolean>(false)

  React.useEffect(() => {
    setOrder((order) => ({
      ...order,
      address: client?.address
    }))
  }, [client])

  function getStepContent (step: number) {
    switch (step) {
      case 0:
        return (
          <FirstStep
            isDelivery={order.isDelivery}
            isSaved={saveAddress}
            toggleSaveAddress={(isSaved) => setSaveAddress(isSaved)}
            setDeliveryFn={(isDelivery: boolean) =>
              setOrder((order) => ({
                ...order,
                isDelivery
              }))}
            renderAddressForm={() => (
              <AddressForm
                initial={order.address}
                onSubmit={async function (updatedAddress: Address): Promise<void> {
                  setOrder((order) => ({
                    ...order,
                    address: updatedAddress
                  }))
                  handleNext(true)
                  return await Promise.resolve()
                }}
                hideButton
                formRef={addressFormRef}
                required
              />
            )}
          />
        )
      case 1:
        return <PaymentForm />
      case 2:
        return <OrderReview order={order} />
      default:
        throw new Error('Unknown step')
    }
  }

  const handleNext = (stepSubmitted?: boolean) => {
    if (activeStep === 0 && !stepSubmitted) {
      if (order.isDelivery) {
        addressFormRef.current?.requestSubmit()
        return
      }
    }
    if (activeStep === steps.length - 1) {
      console.log('Finish')
      placeOrder(saveAddress).then((order) => setOrder(order)).finally()
    }
    setActiveStep(activeStep + 1)
  }

  async function placeOrder (saveAddress?: boolean): Promise<Order> {
    const placedOrder = await orderService.placeOrder(order)
    await cartService.clearCart(order.clientId)
    if (saveAddress) {
      const updatedClient: Client = {
        ...client!,
        address: order.address as Address
      }
      await clientService.updateClient(updatedClient)
    }
    return placedOrder
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <Modal
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open
      onClose={onModalClose}
    >
      <Container component='main' maxWidth='md' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='h1' variant='h4' align='center'>
            Order
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length
            ? (
              <>
                <Typography variant='h5' gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant='subtitle1'>
                  Your order number is {order.id}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
              )
            : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant='contained'
                    onClick={() => handleNext()}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </>
              )}
        </Paper>
      </Container>
    </Modal>
  )
}
