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

const CategoryPicker = ({
  selectedCategory,
  onClick,
  addAll,
  setFieldValue,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <View {...props}>
      <FlatList
        data={addAll ? ['all', ...categories] : categories}
        horizontal
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              onClick ? onClick(item) : setFieldValue('category', item)
            }
          >
            <Text
              style={[
                styles.category,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  fontWeight: item === selectedCategory ? 'bold' : 'normal',
                  borderBottomColor:
                    item === selectedCategory ? colors.blue : 'transparent',
                  color: item === selectedCategory ? colors.blue : colors.text
                }
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  category: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    fontFamily: 'OpenSans-SemiBold'
  }
})

export default CategoryPicker
