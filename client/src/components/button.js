import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

const Button = ({ children, ...props }) => {
  return (
    <TouchableHighlight {...props} style={[styles.button, props.style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 999
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2
  }
})

export default Button
