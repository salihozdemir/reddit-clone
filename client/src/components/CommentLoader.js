import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import TextLoader from './TextLoader'

const CommentLoader = ({ ...props }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.loader, { backgroundColor: colors.bgColor }]} {...props}>
      <TextLoader style={{ width: '30%', marginTop: 10 }} />
      <TextLoader style={{ width: '100%', marginTop: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 10,
    elevation: 1
  }
})

export default CommentLoader
