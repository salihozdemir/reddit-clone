import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '../components/button'
import { Spaceship } from './icons/index'

const SignModal = ({ navigation }) => {
  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <Spaceship width={200} height={200} />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.signUp}
          underlayColor="#4f76b9"
          onPress={() => navigation.navigate('SignUp')}
        >
          Create Account
        </Button>
        <Button
          style={styles.signIn}
          underlayColor="#b36e51"
          onPress={() => navigation.navigate('SignIn')}
        >
          Sign In
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonContainer: {
    width: '90%',
    marginTop: 100
  },
  signIn: {
    backgroundColor: '#ce815e'
  },
  signUp: {
    backgroundColor: 'cornflowerblue'
  }
})

export default SignModal
