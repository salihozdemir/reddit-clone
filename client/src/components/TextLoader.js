import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const TextLoader = ({ ...props }) => {
  const { colors } = useTheme()

  return <View style={[styles.bgLight, props.style, { backgroundColor: colors.loader }]} />
}

const styles = StyleSheet.create({
  bgLight: {
    width: 60,
    height: 16,
    borderRadius: 5
  }
})

export default TextLoader
