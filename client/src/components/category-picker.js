import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const CategoryPicker = ({ item, isActive, setActive }) => {
  const styles = StyleSheet.create({
    category: {
      padding: 5,
      marginLeft: 5,
      marginRight: 5,
      color: isActive ? 'cornflowerblue' : '#424242',
      borderBottomWidth: 1,
      borderBottomColor: isActive ? 'cornflowerblue' : 'transparent'
    }
  })

  return (
    <TouchableOpacity onPress={setActive}>
      <Text style={styles.category}>{item}</Text>
    </TouchableOpacity>
  )
}

export default CategoryPicker
