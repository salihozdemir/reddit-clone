import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import axios from '../utils/fetcher'

import { Plus } from '../components/icons'
import CategoryPicker from '../components/category-picker'

const TypeSwichContainer = ({ children }) => {
  return <View style={styles.typeContainer}>{children}</View>
}

const TypeSwichButton = ({ selected, onClick, title }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.typeButton,
        title === 'Link' ? styles.typeButtonRight : styles.typeButtonLeft,
        selected === title ? { backgroundColor: colors.blue } : '',
        { borderColor: colors.lightGrey }
      ]}
      onPress={() => onClick(title)}
    >
      <View>
        <Text
          style={[
            styles.typeButtonLabel,
            selected === title ? { color: colors.white } : ''
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const CreatePost = () => {
  const { colors } = useTheme()

  const [type, setType] = React.useState('Text')
  const [category, setCategory] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [text, setText] = React.useState('')

  const createPost = async () => {
    try {
      const payload = { type, category, title, url, text }
      await axios.post('posts', payload)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <ScrollView
      as={SafeAreaView}
      style={[styles.container, { backgroundColor: colors.bgColor }]}
    >
      <Text style={[styles.formLabel, { color: colors.grey }]}>TYPE</Text>
      <TypeSwichContainer>
        <TypeSwichButton selected={type} onClick={setType} title="Text" />
        <TypeSwichButton selected={type} onClick={setType} title="Link" />
      </TypeSwichContainer>
      <Text style={[styles.formLabel, { color: colors.grey }]}>CATEGORY</Text>
      <CategoryPicker
        selected={category}
        onClick={setCategory}
        style={{ marginBottom: 10 }}
      />
      <Text style={[styles.formLabel, { color: colors.grey }]}>TITLE</Text>
      <TextInput
        style={[
          styles.textInput,
          { borderColor: colors.lightGrey, height: 40 }
        ]}
        onChangeText={text => setTitle(text)}
        value={title}
      />
      {type === 'Link' ? (
        <>
          <Text style={[styles.formLabel, { color: colors.grey }]}>URL</Text>
          <TextInput
            style={[styles.textInput, { borderColor: colors.lightGrey }]}
            onChangeText={text => setUrl(text)}
            value={url}
          />
        </>
      ) : (
        <>
          <Text style={[styles.formLabel, { color: colors.grey }]}>TEXT</Text>
          <TextInput
            style={[styles.textInput, { borderColor: colors.lightGrey }]}
            multiline={true}
            numberOfLines={10}
            value={text}
            onChangeText={text => setText(text)}
          />
        </>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.blue }]}
          onPress={() => createPost()}
        >
          <Plus color={colors.white} />
          <Text
            style={{
              color: colors.white,
              fontWeight: 'bold',
              fontSize: 15
            }}
          >
            Create Post
          </Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center'
  },
  textInput: {
    borderWidth: 1,
    textAlignVertical: 'top',
    marginTop: 5
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
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CreatePost
