import React from 'react'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthContext } from '../context/auth-context'

const SignUp = ({ navigation }) => {
  const { authContext } = React.useContext(AuthContext)

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign in"
        onPress={() => {
          authContext.signIn({ username, password })
          navigation.navigate('User')
        }}
      />
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

export default SignUp
