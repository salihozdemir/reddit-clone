import React from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Send } from '../components/icons'

const CreateComment = ({ onPress, setComment }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Create a new comment"
        onChangeText={setComment}
      />
      <TouchableOpacity onPress={onPress}>
        <Send color={colors.grey} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    margin: 5,
    height: 40,
    borderRadius: 10
  }
})

export default CreateComment
