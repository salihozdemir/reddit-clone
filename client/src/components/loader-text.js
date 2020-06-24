import React from 'react'
import { View, StyleSheet } from 'react-native'

const LoaderText = ({ ...props }) => {
  return <View style={[styles.bgLight, props.style]} />
}

const styles = StyleSheet.create({
  bgLight: {
    backgroundColor: '#eeeeee',
    width: 60,
    height: 16,
    borderRadius: 5
  }
})

export default LoaderText
