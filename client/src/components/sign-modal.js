import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIns = ({ navigation }) => {
  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <View style={styles.buttonContainer}>
        <Button title="SignUp" onPress={() => navigation.navigate('SignUp')} />
        <Button title="SignIn" onPress={() => navigation.navigate('SignIn')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 200
  }
})

export default SignIns
