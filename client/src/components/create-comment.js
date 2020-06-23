import React from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'

import { Send } from '../components/icons'

const createComment = ({ onPress, setComment }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Create a new comment"
        onChangeText={setComment}
      />
      <TouchableOpacity onPress={onPress}>
        <Send color="black" />
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

export default createComment
