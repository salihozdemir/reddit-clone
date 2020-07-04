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

  const signIn = async data => {
    let response
    try {
      // Axiosu taşı sign in dediğim yere.
      response = await axios.post('authenticate', data)

      const { token, expiresAt, userInfo } = response.data
      try {
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('expiresAt', JSON.stringify(expiresAt))
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      } catch (error) {
        console.log(error)
      }

      setAuthState({ token, expiresAt, userInfo })
    } catch (error) {
      return error.response.data
    }
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

  const signUp = async data => {
    const response = await axios.post('signup', data)

    if (response.status === 200) {
      const { token, expiresAt, userInfo } = response.data
      try {
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('expiresAt', JSON.stringify(expiresAt))
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      } catch (error) {
        console.error(error)
      }

      setAuthState({ token, expiresAt, userInfo })
    }
  }

  return (
    <Provider value={{ authState, signIn, signOut, signUp }}>
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
