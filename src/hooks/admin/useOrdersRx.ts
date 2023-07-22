import { useEffect, useState } from 'react'
import Order from '../../model/Order'
import { orderService } from '../../config/servicesConfig'
import useCodeTypeDispatch from '../useCodeTypeDispatch'

const useOrdersRx = (): [boolean, string, Order[]] => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const codeTypeDispatch = useCodeTypeDispatch();

  useEffect(() => {
    setIsLoading(true)
    const subscription = orderService.getAllOrdersRx().subscribe({
      next: (res: Order[] | string) => {
        if (typeof res === 'string') {
          codeTypeDispatch("", res)
          setError(res)
        } else {
          setError('')
          setOrders(res)
        }
        setIsLoading(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return [isLoading, error, orders]
}

export default useOrdersRx
