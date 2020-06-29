import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import LoaderText from './loader-text'

const CommentLoader = ({ ...props }) => {
  const { colors } = useTheme()

  return (
    <View
      style={[styles.loaderComment, { backgroundColor: colors.bgColor }]}
      {...props}
    >
      <LoaderText style={{ width: '30%', marginTop: 10 }} />
      <LoaderText style={{ width: '100%', marginTop: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  loaderComment: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 10,
    elevation: 1
  }
})

export default CommentLoader
