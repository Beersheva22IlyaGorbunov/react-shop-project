import { useDispatch } from 'react-redux'
import CodeType from '../model/CodeType'
import { codeActions } from '../redux/slices/CodeSlice'

const useCodeTypeDispatch = () => {
  const dispatch = useDispatch()

  function processResponse (successMsg: string, error: string) {
    let code: CodeType = CodeType.OK
    let message: string = ''

    console.log(typeof error, error)

    if (error.includes('Authentication')) {
      code = CodeType.AUTH_ERROR
      message = "Can't recognize you, you need to login"
    } else if (error.includes('Not found')) {
      code = CodeType.NOT_FOUND
      message = 'Can\'t find employee'
    } else if (error.includes('unavailable')) {
      code = CodeType.SERVER_ERROR
      message = error
    } else if (error.length > 0) {
      code = CodeType.UNKNOWN
      message = error
    }

    dispatch(codeActions.set({
      codeMsg: {
        code,
        message: message || successMsg
      }
    }))
  }

  return processResponse
}

export default useCodeTypeDispatch
