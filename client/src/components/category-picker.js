import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  View
} from 'react-native'
import { useTheme } from '@react-navigation/native'

import categories from '../constants/categories'

const CategoryPicker = ({ selected, onClick, addAll, ...props }) => {
  return (
    <View {...props}>
      <FlatList
        data={addAll ? ['all', ...categories] : categories}
        horizontal
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            isActive={item === selected}
            setActive={() => onClick(item)}
          />
        )}
      />
    </View>
  )
}

const CategoryItem = ({ item, isActive, setActive }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    category: {
      padding: 5,
      marginLeft: 5,
      marginRight: 5,
      color: isActive ? colors.blue : colors.grey,
      borderBottomWidth: 1,
      borderBottomColor: isActive ? colors.blue : 'transparent',
      fontWeight: isActive ? 'bold' : 'normal'
    }
  })

  return (
    <TouchableOpacity onPress={setActive}>
      <Text style={styles.category}>{item}</Text>
    </TouchableOpacity>
  )
}

export default CategoryPicker
