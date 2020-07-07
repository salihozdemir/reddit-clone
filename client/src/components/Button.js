import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Button = ({ children, bgColor, title, ...props }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, { backgroundColor: bgColor }]}
      activeOpacity={0.8}
    >
      {children}
      <Text style={[styles.buttonText, { color: colors.white }]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 999,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10
  }
})

export default Button
