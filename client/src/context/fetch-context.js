import React from 'react'
import axios from 'axios'
import { AuthContext } from './auth-context'

const FetchContext = React.createContext()
const { Provider } = FetchContext

const FetchProvider = ({ children }) => {
  const { authState } = React.useContext(AuthContext)
  const authAxios = axios.create({
    baseURL: 'http://172.17.0.1:8080/api/'
  })

  authAxios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${authState.token}`
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  authAxios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const code = error && error.response ? error.response.status : 0
      if (code === 401 || code === 403) {
        console.log('error code', code)
      }
      return Promise.reject(error)
    }
  )

  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  )
}

export { FetchContext, FetchProvider }
