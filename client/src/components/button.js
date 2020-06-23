import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Button = ({ children, ...props }) => {
  const { colors } = useTheme()

  return (
    <TouchableHighlight {...props} style={[styles.button, props.style]}>
      <Text style={[styles.buttonText, { color: colors.buttonText }]}>
        {children}
      </Text>
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
    textAlign: 'center',
    letterSpacing: 2
  }
})

export default Button
