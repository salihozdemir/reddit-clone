import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const AuthContext = React.createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            userInfo: action.userInfo,
            expiresAt: action.expiresAt,
            isLoading: false
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
            expiresAt: action.expiresAt,
            userInfo: action.userInfo
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            token: null,
            expiresAt: null,
            userInfo: {}
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
      expiresAt: null,
      userInfo: {}
    }
  )

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const expiresAt = await AsyncStorage.getItem('expiresAt')
        const userInfo = await AsyncStorage.getItem('userInfo')

        if (new Date().getTime() / 1000 > JSON.parse(expiresAt)) {
          dispatch({ type: 'SIGN_OUT' })
        }

        dispatch({
          type: 'RESTORE_TOKEN',
          token,
          expiresAt,
          userInfo: userInfo ? JSON.parse(userInfo) : {}
        })
      } catch (e) {
        console.log(e)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          const response = await fetch(
            'http://172.17.0.1:8080/api/authenticate',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }
          )

          const { token, expiresAt, userInfo } = await response.json()
          if (response.ok) {
            await AsyncStorage.setItem('token', token)
            await AsyncStorage.setItem('expiresAt', JSON.stringify(expiresAt))
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

            dispatch({ type: 'SIGN_IN', token, expiresAt, userInfo })
          }
        } catch (error) {
          console.error(error)
        }
      },
      signOut: async () => {
        const keys = ['token', 'expiresAt', 'userInfo']

        try {
          await AsyncStorage.multiRemove(keys)
        } catch (error) {
          console.log(error)
        }

        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        try {
          const response = await fetch('http://172.17.0.1:8080/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })

          const { token, expiresAt, userInfo } = await response.json()
          if (response.ok) {
            await AsyncStorage.setItem('token', token)
            await AsyncStorage.setItem('expiresAt', JSON.stringify(expiresAt))
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

            dispatch({ type: 'SIGN_IN', token, expiresAt, userInfo })
          }
        } catch (error) {
          console.error(error)
        }
      }
    }),
    []
  )

  return <Provider value={{ authContext, authState }}>{children}</Provider>
}

export { AuthContext, AuthProvider }
