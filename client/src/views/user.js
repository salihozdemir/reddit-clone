import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthContext } from '../context/auth-context'

const User = ({ navigation }) => {
  const { authContext, authState } = React.useContext(AuthContext)
  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <Text style={styles.text}>Token: {authState.token}</Text>
      <Text style={styles.text}>ExpiresAt: {authState.expiresAt}</Text>
      <Text style={styles.text}>Username: {authState.userInfo.username}</Text>
      <Text style={styles.text}>Role: {authState.userInfo.role}</Text>
      <Text style={styles.text}>Id: {authState.userInfo.id}</Text>
      <Button title="Sign Out" onPress={() => authContext.signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    fontSize: 30,
    color: 'red'
  }
})

export default User
