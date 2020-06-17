import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FetchContext } from '../context/fetch-context'
import CategoryPicker from '../components/category-picker'

const TypeSwichContainer = ({ children }) => {
  return <View style={styles.typeContainer}>{children}</View>
}

const TypeSwichButton = ({ selected, onClick, title }) => {
  return (
    <TouchableOpacity
      style={[
        styles.typeButton,
        title === 'Link' ? styles.typeButtonRight : styles.typeButtonLeft,
        selected === title ? styles.selectedButton : ''
      ]}
      onPress={() => onClick(title)}
    >
      <View>
        <Text
          style={[
            styles.typeButtonLabel,
            selected === title ? styles.whiteText : ''
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const CreatePost = () => {
  const fetchContext = React.useContext(FetchContext)

  const [type, setType] = React.useState('Text')
  const [category, setCategory] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [text, setText] = React.useState('')

  const createPost = async () => {
    try {
      const payload = { type, category, title, url, text }
      await fetchContext.authAxios.post('posts', payload)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <View as={SafeAreaView} style={styles.container}>
      <Text>Type</Text>
      <TypeSwichContainer>
        <TypeSwichButton selected={type} onClick={setType} title="Text" />
        <TypeSwichButton selected={type} onClick={setType} title="Link" />
      </TypeSwichContainer>
      <Text>Category</Text>
      <CategoryPicker selected={category} onClick={setCategory} />
      <Text>Title</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setTitle(text)}
      />
      {type === 'Link' ? (
        <>
          <Text>Url</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUrl(text)}
          />
        </>
      ) : (
        <>
          <Text>Text</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={10}
            onChangeText={text => setText(text)}
          />
        </>
      )}
      <View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => createPost()}
        >
          <Text style={styles.whiteText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white'
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
    borderWidth: 1,
    borderColor: '#e4e4e4'
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
  selectedButton: {
    backgroundColor: 'cornflowerblue'
  },
  whiteText: {
    color: 'white'
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top'
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue',
    height: 40
  }
})

export default CreatePost
