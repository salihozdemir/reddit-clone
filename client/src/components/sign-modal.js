import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import Button from '../components/button'
import { Spaceship } from './icons/index'

const SignModal = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <Spaceship width={200} height={200} />
      <View
        style={[styles.buttonContainer, { backgroundColor: colors.bgColor }]}
      >
        <Button
          style={{ backgroundColor: colors.signUpButton }}
          underlayColor="#4f76b9"
          onPress={() => navigation.navigate('SignUp')}
        >
          Create Account
        </Button>
        <Button
          style={{ backgroundColor: colors.SignInColor }}
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
    alignItems: 'center'
  },
  buttonContainer: {
    width: '90%',
    marginTop: 100
  }
})

export default SignModal
