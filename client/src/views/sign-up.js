import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '../components/button'
import { FurnitureAndHousehold } from '../components/icons/index'

const SignIn = ({ navigation }) => {
  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <FurnitureAndHousehold weight={150} height={150} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="#1e1e1e"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#1e1e1e"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor="#1e1e1e"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.submit}
          underlayColor="#4f76b9"
          onPress={() => navigation.navigate('SignUp')}
        >
          Go!
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
    width: '90%'
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
  submit: {
    backgroundColor: 'cornflowerblue'
  },
  textInputContainer: {
    width: '90%',
    marginTop: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#9f9f9f',
    height: 50,
    borderRadius: 10,
    margin: 10,
    paddingLeft: 20
  }
})

export default SignIn
