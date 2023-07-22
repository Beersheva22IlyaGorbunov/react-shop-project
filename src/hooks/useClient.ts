import { useEffect, useState } from 'react'
import { clientService } from '../config/servicesConfig'
import Client from '../model/Client'
import useCodeTypeDispatch from './useCodeTypeDispatch'

const useClient = (id: string): [Client | undefined, boolean, string] => {
  const [client, setClient] = useState<Client>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState('')
  const codeTypeDispatch = useCodeTypeDispatch();

  useEffect(() => {
    setIsLoading(true)
    setError('')

    clientService
      .getClient(id)
      .then((res: Client) => {
        setClient(res)
      })
      .catch((err) => {
        codeTypeDispatch("", err)
        setError(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return [client, isLoading, error]
}

export default useClient
