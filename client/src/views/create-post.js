import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Animated
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import axios from '../utils/fetcher'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { Plus } from '../components/icons'
import CategoryPicker from '../components/category-picker'

const TypeSwichContainer = ({ children }) => {
  return <View style={styles.typeContainer}>{children}</View>
}

const TypeSwichButton = ({ selected, onClick, type }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.typeButton,
        type === 'link' ? styles.typeButtonRight : styles.typeButtonLeft,
        selected === type ? { backgroundColor: colors.blue } : '',
        { borderColor: colors.border }
      ]}
      onPress={() => onClick('type', type)}
    >
      <View>
        <Text
          style={[
            styles.typeButtonLabel,
            { color: colors.text },
            selected === type ? { color: 'white' } : ''
          ]}
        >
          {type}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const CreatePost = () => {
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start()
  }

  return (
    <ScrollView
      as={SafeAreaView}
      style={[styles.container, { backgroundColor: colors.bgColor }]}
    >
      <Formik
        initialValues={{
          type: 'text',
          category: '',
          title: '',
          url: '',
          text: ''
        }}
        onSubmit={async (values, { setStatus, resetForm }) => {
          setIsLoading(true)
          try {
            await axios.post('posts', values)
            resetForm({ ...values, type: 'text' })
            setMessage('Successfully Created')
            fadeIn()
          } catch (error) {
            setStatus(error.response.data.message)
          }
          setIsLoading(false)
        }}
        validationSchema={Yup.object({
          type: Yup.mixed().oneOf(['text', 'link']),
          category: Yup.string().required('Required'),
          title: Yup.string()
            .required('Required')
            .max(100, 'Must be at most 100 characters long'),
          text: Yup.string().when('type', {
            is: 'text',
            then: Yup.string()
              .required('Required')
              .min(4, 'Must be at least 4 characters long')
          }),
          url: Yup.string().when('type', {
            is: 'link',
            then: Yup.string()
              .required('Required')
              .url('Invalid Url')
          })
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
          setFieldValue
        }) => (
          <View>
            <Animated.View
              style={{
                opacity: fadeAnim
              }}
            >
              {!!message && <Text style={styles.message}>{message}</Text>}
            </Animated.View>
            {!!status && <Text style={styles.status}>{status}</Text>}
            <View style={styles.flexRow}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Type
              </Text>
              {touched.type && errors.type && (
                <Text style={styles.errorMessage}>{errors.type}</Text>
              )}
            </View>
            <TypeSwichContainer>
              <TypeSwichButton
                selected={values.type}
                onClick={setFieldValue}
                type="text"
              />
              <TypeSwichButton
                selected={values.type}
                onClick={setFieldValue}
                type="link"
              />
            </TypeSwichContainer>
            <View style={styles.flexRow}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Category
              </Text>
              {touched.category && errors.category && (
                <Text style={styles.errorMessage}>{errors.category}</Text>
              )}
            </View>
            <CategoryPicker
              selectedCategory={values.category}
              setFieldValue={setFieldValue}
            />

            <View style={styles.flexRow}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Title
              </Text>
              {touched.title && errors.title && (
                <Text style={styles.errorMessage}>{errors.title}</Text>
              )}
            </View>
            <TextInput
              style={[
                styles.textInput,
                // eslint-disable-next-line react-native/no-inline-styles
                { borderColor: colors.border, color: colors.text, height: 40 },
                touched.title && errors.title && { borderColor: colors.red }
              ]}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
            />

            {values.type === 'link' ? (
              <>
                <View style={styles.flexRow}>
                  <Text style={[styles.formLabel, { color: colors.text }]}>
                    Url
                  </Text>
                  {touched.url && errors.url && (
                    <Text style={styles.errorMessage}>{errors.url}</Text>
                  )}
                </View>
                <TextInput
                  style={[
                    styles.textInput,
                    { borderColor: colors.border, color: colors.text },
                    touched.url && errors.url && { borderColor: colors.red }
                  ]}
                  multiline
                  value={values.url}
                  onChangeText={handleChange('url')}
                  onBlur={handleBlur('url')}
                />
              </>
            ) : (
              <>
                <View style={styles.flexRow}>
                  <Text style={[styles.formLabel, { color: colors.text }]}>
                    Text
                  </Text>
                  {touched.text && errors.text && (
                    <Text style={styles.errorMessage}>{errors.text}</Text>
                  )}
                </View>
                <TextInput
                  style={[
                    styles.textInput,
                    { borderColor: colors.border, color: colors.text },
                    touched.text && errors.text && { borderColor: colors.red }
                  ]}
                  multiline
                  value={values.text}
                  onChangeText={handleChange('text')}
                  onBlur={handleBlur('text')}
                />
              </>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: colors.blue }]}
                onPress={handleSubmit}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Plus color="white" />
                )}
                <Text style={styles.submitButtonText}>Create Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 7
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  typeButton: {
    flex: 0.5,
    justifyContent: 'center',
    height: 30,
    borderWidth: 1
  },
  typeButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  typeButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  typeButtonLabel: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'OpenSans-SemiBold'
  },
  textInput: {
    borderWidth: 1,
    textAlignVertical: 'top',
    marginTop: 5,
    paddingLeft: 10
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 40,
    borderRadius: 10,
    flex: 0.4
  },
  formLabel: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  status: {
    color: 'red',
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  errorMessage: {
    color: 'red',
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 15
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 15
  },
  message: {
    color: '#5b715d',
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#cdffd3',
    padding: 10,
    borderRadius: 10
  }
})

export default CreatePost
