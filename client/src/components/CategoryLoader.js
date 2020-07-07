import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import TextLoader from './TextLoader'

const CategoryLoader = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.loader, { backgroundColor: colors.bgColor }]}>
      {[1, 2, 3, 4, 5].map(i => (
        <TextLoader key={i} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    padding: 5,
    marginTop: 7,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default CategoryLoader
