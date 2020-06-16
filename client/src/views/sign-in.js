import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <Text style={styles.text}>SignIn Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    color: 'red'
  }
})

export default SignIn
