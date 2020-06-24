import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import LoaderText from './loader-text'

const PostLoader = ({ ...props }) => {
  const { colors } = useTheme()

  return (
    <View
      style={[styles.loaderPosts, { backgroundColor: colors.bgColor }]}
      {...props}
    >
      <LoaderText style={{ width: '30%', marginTop: 10 }} />
      {[1, 2, 3].map(i => (
        <LoaderText key={i} style={{ width: '100%', marginTop: 10 }} />
      ))}
      <LoaderText style={{ width: '80%', marginTop: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  loaderPosts: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 7,
    elevation: 1
  }
})

export default PostLoader
