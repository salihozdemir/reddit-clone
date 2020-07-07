import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import Button from '../components/Button'
import { LogIn, PlusCircle } from '../components/icons'

const SignModal = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View as={SafeAreaView} style={styles.container}>
        <StatusBar hidden />
        <View
          style={[styles.modal, { backgroundColor: colors.background }]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.buttonContainer}>
            <Button
              bgColor={colors.signUpButton}
              title="Sign Up"
              onPress={() => navigation.navigate('SignUp')}
            >
              <PlusCircle color={colors.white} />
            </Button>
            <Button
              bgColor={colors.signInButton}
              title="Sign In"
              onPress={() => navigation.navigate('SignIn')}
            >
              <LogIn color={colors.white} />
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modal: {
    padding: 16,
    width: '100%',
    borderRadius: 6,
    elevation: 6,
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    flex: 1
  }
})

export default SignModal
