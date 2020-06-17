import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native'
// import { Picker } from '@react-native-community/picker'
import CategoryPicker from '../components/category-picker'
import { SafeAreaView } from 'react-native-safe-area-context'

import categories from '../categories'

const CreatePost = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('')
  return (
    <View as={SafeAreaView} style={styles.categoryContainer}>
      <Text>Category</Text>
      <View>
        <FlatList
          data={categories}
          horizontal={true}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <CategoryPicker
              item={item}
              isActive={item === selectedCategory}
              setActive={() => setSelectedCategory(item)}
            />
          )}
        />
      </View>
      <Text>{selectedCategory}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 5,
    backgroundColor: 'white'
  }
})

export default CreatePost
