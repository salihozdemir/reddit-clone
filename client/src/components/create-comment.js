import React from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Send } from '../components/icons'

const CreateComment = ({ onPress, setComment, comment, setIsFocused }) => {
  const { colors } = useTheme()
  const textInputRef = React.useRef()

  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor: colors.background, color: colors.text }
        ]}
        ref={textInputRef}
        placeholder="Add a comment"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={setComment}
        maxLength={2000}
        autoCorrect={false}
        value={comment}
      />
      <TouchableOpacity
        onPress={() => {
          textInputRef.current.blur()
          onPress()
        }}
      >
        <Send color={colors.text} />
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
