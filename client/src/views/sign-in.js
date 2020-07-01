import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../components/button'
import { AuthContext } from '../context/auth-context'

const SignUp = ({ navigation }) => {
  const { authContext } = React.useContext(AuthContext)
  const { colors } = useTheme()
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={values => {
        // authContext.signIn(values)
        // navigation.navigate('Home')
        console.log('calisti')
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Required')
          .max(32, 'Must be at most 32 characters long')
          .matches(/^[a-zA-Z0-9_-]+$/, 'Contains invalid characters'),
        password: Yup.string()
          .required('Required')
          .min(6, 'Must be at least 6 characters long')
          .max(50, 'Must be at most 50 characters long')
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, touched, errors }) => (
        <View as={SafeAreaView} style={styles.boxCenter}>
          <View style={styles.container}>
            {touched.username && errors.username && (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            )}
            <TextInput
              style={[
                styles.textInput,
                touched.username && errors.username && { borderColor: colors.downVote }
              ]}
              placeholder="Username"
              placeholderTextColor="#1e1e1e"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
            <TextInput
              style={[
                styles.textInput,
                touched.password && errors.password && { borderColor: colors.downVote }
              ]}
              placeholder="Password"
              placeholderTextColor="#1e1e1e"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
            />
          </View>
          <View style={styles.container}>
            <Button style={styles.submitButton} underlayColor="#4f76b9" onPress={handleSubmit}>
              Go!
            </Button>
          </View>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
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
  },
  errorMessage: {
    color: 'red',
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default SignUp
