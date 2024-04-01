import {useEffect, useState} from 'react'
import {useAuth, useCart} from '../stores'
import {api} from '../api'
import {alertError} from '../util/error'

export const RequestAppDataComponent: React.FC = () => {
  const token = useAuth(state => state.token)
  const [initDone, setInitDone] = useState(false)

  const setCart = useCart(state => state.setCart)

  useEffect(() => {
    if (token === null) {
      return
    }
    if (initDone) {
      return
    }
    setInitDone(true)

    api.getCart(token).then(setCart).catch(alertError)
  }, [token, setInitDone])

  return null
}
