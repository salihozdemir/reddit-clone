import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider } from './context/auth-context'
import Navigation from './navigation'

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  )
}

export default App
