import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const ThemeContext = React.createContext()
const { Provider } = ThemeContext

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light')

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme')
        if (theme) {
          setTheme(theme)
        }
      } catch (error) {
        console.log(error)
      }
    }

    bootstrapAsync()
  }, [])

  const changeTheme = async value => {
    setTheme(value)
    try {
      await AsyncStorage.setItem('theme', value)
    } catch (error) {
      console.log(error)
    }
  }
  return <Provider value={{ theme, changeTheme }}>{children}</Provider>
}

export { ThemeProvider, ThemeContext }
