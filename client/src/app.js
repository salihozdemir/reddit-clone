import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider } from './context/auth-context'
import { FetchProvider } from './context/fetch-context'
import Navigation from './navigation'

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FetchProvider>
          <Navigation />
        </FetchProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

export default App
