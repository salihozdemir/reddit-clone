import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
if (__DEV__) {
  import('../ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import { AuthProvider } from './context/authContext'
import { ThemeProvider } from './context/themeSwichContext'
import Navigation from './navigation'

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

export default App
