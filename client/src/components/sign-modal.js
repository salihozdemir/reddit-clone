import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Spaceship } from './icons/index'

const SignModa = ({ navigation }) => {
  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <Spaceship width={200} height={200} />
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.button, styles.signUp]}
          underlayColor="#4f76b9"
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.signIn]}
          underlayColor="#b36e51"
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
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
  button: {
    height: 50,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 999
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2
  },
  signIn: {
    backgroundColor: '#ce815e'
  },
  signUp: {
    backgroundColor: 'cornflowerblue'
  }
})

export default SignModa
