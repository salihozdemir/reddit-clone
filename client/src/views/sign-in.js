import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '../components/button'
import { AuthContext } from '../context/auth-context'

const SignUp = ({ navigation }) => {
  const { authContext } = React.useContext(AuthContext)

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <View style={styles.buttonContainer}>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          placeholderTextColor="#1e1e1e"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#1e1e1e"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.submitButton}
          underlayColor="#4f76b9"
          onPress={() => {
            authContext.signIn({ username, password })
            navigation.navigate('Home')
          }}
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
    alignItems: 'center'
  },
  buttonContainer: {
    width: '90%'
  },
  submitButton: {
    backgroundColor: 'cornflowerblue'
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

export default SignUp
