import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider } from './context/auth-context'
import { ThemeProvider } from './context/theme-swich-context'
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
