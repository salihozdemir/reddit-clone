import React from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Send } from '../components/icons'

const CreateComment = ({ onPress, setComment, comment }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      <TextInput
        style={[styles.textInput, { backgroundColor: colors.background }]}
        placeholder="Add a comment"
        onChangeText={setComment}
        maxLength={2000}
        autoCorrect={false}
        value={comment}
      />
      <TouchableOpacity onPress={onPress}>
        <Send color={colors.grey} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    paddingHorizontal: 5,
    elevation: 3
  },
  textInput: {
    flex: 1,
    margin: 5,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15
  }
})

export default CreateComment
