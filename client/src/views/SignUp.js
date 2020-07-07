import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import axios from '../utils/fetcher'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../components/Button'
import { AuthContext } from '../context/authContext'

const SignUp = ({ navigation }) => {
  const { setStorage } = React.useContext(AuthContext)
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        onSubmit={async (values, { setStatus, resetForm }) => {
          try {
            const { data } = await axios.post('signup', values)
            const { token, expiresAt, userInfo } = data
            setStorage(token, expiresAt, userInfo)
            navigation.navigate('Home')
            resetForm({})
          } catch (error) {
            setStatus(error.response.data.message)
          }
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Required')
            .max(32, 'Must be at most 32 characters long')
            .matches(/^[a-zA-Z0-9_-]+$/, 'Contains invalid characters'),
          password: Yup.string()
            .required('Required')
            .min(6, 'Must be at least 6 characters long')
            .max(50, 'Must be at most 50 characters long'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
          )
        })}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          status,
          values,
          setTouched
        }) => (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View as={SafeAreaView} style={styles.container}>
              <View
                style={[styles.modal, { backgroundColor: colors.background }]}
                onStartShouldSetResponder={() => true}
                onResponderRelease={() => setTouched(errors)}
              >
                {!!status && <Text style={styles.status}>{status}</Text>}
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
                <TextInput
                  style={[
                    styles.textInput,
                    touched.username && errors.username && { borderColor: colors.red },
                    { color: colors.text }
                  ]}
                  placeholder="Username"
                  placeholderTextColor={colors.text}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
                <TextInput
                  style={[
                    styles.textInput,
                    touched.password && errors.password && { borderColor: colors.red },
                    { color: colors.text }
                  ]}
                  placeholder="Password"
                  placeholderTextColor={colors.text}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />
                {touched.passwordConfirmation && errors.passwordConfirmation && (
                  <Text style={styles.errorMessage}>{errors.passwordConfirmation}</Text>
                )}
                <TextInput
                  style={[
                    styles.textInput,
                    touched.passwordConfirmation &&
                      errors.passwordConfirmation && {
                        borderColor: colors.red
                      },
                    { color: colors.text }
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor={colors.text}
                  value={values.passwordConfirmation}
                  onChangeText={handleChange('passwordConfirmation')}
                  onBlur={handleBlur('passwordConfirmation')}
                  secureTextEntry
                />
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={handleSubmit}
                    title="Create Account"
                    bgColor={colors.signUpButton}
                  >
                    {isLoading && <ActivityIndicator size="small" color="white" />}
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </KeyboardAvoidingView>
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
    height: 400,
    borderRadius: 6,
    elevation: 6,
    justifyContent: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#9f9f9f',
    height: 50,
    borderRadius: 10,
    margin: 10,
    paddingLeft: 20
  },
  errorMessage: {
    color: 'red',
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 15
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  status: {
    color: 'red',
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  }
})

export default SignUp
