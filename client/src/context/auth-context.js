import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import axios from '../utils/fetcher'

const AuthContext = React.createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({})

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let token, expiresAt, userInfo
      try {
        token = await AsyncStorage.getItem('token')
        expiresAt = await AsyncStorage.getItem('expiresAt')
        userInfo = await AsyncStorage.getItem('userInfo')
      } catch (e) {
        console.log(e)
      }

      if (new Date().getTime() / 1000 > JSON.parse(expiresAt)) {
        signOut()
      }

      setAuthState({
        token,
        expiresAt,
        userInfo: userInfo ? JSON.parse(userInfo) : {}
      })
    }

    bootstrapAsync()
  }, [])

  const setStorage = async (token, expiresAt, userInfo) => {
    try {
      await AsyncStorage.setItem('token', token)
      await AsyncStorage.setItem('expiresAt', JSON.stringify(expiresAt))
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (error) {
      console.log(error)
    }

    setAuthState({ token, expiresAt, userInfo })
  }

  const signOut = async () => {
    const keys = ['token', 'expiresAt', 'userInfo']

    try {
      await AsyncStorage.multiRemove(keys)
    } catch (error) {
      console.log(error)
    }

    setAuthState({ token: null, expiresAt: null, userInfo: {} })
  }

  return (
    <Provider value={{ authState, setStorage, signOut }}>{children}</Provider>
  )
}

export { AuthContext, AuthProvider }
