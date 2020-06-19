import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  View
} from 'react-native'

import categories from '../categories'

const CategoryPicker = ({ selected, onClick, addAll }) => {
  return (
    <View>
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
