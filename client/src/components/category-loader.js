import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import LoaderText from './loader-text'

const CategoryLoader = () => {
  const { colors } = useTheme()

  return (
    <View
      style={[styles.loaderCategories, { backgroundColor: colors.bgColor }]}
    >
      {[1, 2, 3, 4, 5].map(i => (
        <LoaderText key={i} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  loaderCategories: {
    padding: 5,
    marginTop: 7,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default CategoryLoader
