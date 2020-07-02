import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const instanceAxios = axios.create({
  baseURL: 'http://192.168.1.63:8080/api/'
  // baseURL: 'http://172.17.0.1:8080/api/'
})

instanceAxios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instanceAxios.interceptors.response.use(
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

export default instanceAxios
