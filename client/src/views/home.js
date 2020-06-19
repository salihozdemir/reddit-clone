import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CategoryPicker from '../components/category-picker'
import { FetchContext } from '../context/fetch-context'
import Post from '../components/post'

const Home = () => {
  const fetchContext = React.useContext(FetchContext)

  const [postsData, setPostsData] = React.useState([])
  const [category, setCategory] = React.useState('')
  const [isLoaading, setIsLoaading] = React.useState(false)

  const getPostData = React.useCallback(async () => {
    setIsLoaading(true)
    const { data } = await fetchContext.authAxios.get(
      !category || category === 'all' ? 'posts' : `posts/${category}`
    )
    setPostsData(data)
    setIsLoaading(false)
  }, [category, fetchContext.authAxios])

  React.useEffect(() => {
    getPostData()
  }, [getPostData])

  return (
    <View as={SafeAreaView} style={styles.container}>
      <FlatList
        data={postsData}
        refreshing={isLoaading}
        onRefresh={() => getPostData()}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <CategoryPicker selected={category} onClick={setCategory} addAll />
        }
        ListHeaderComponentStyle={styles.categoryPicker}
        renderItem={({ item }) => (
          <Post
            score={item.score}
            type={item.type}
            title={item.title}
            author={item.author}
            category={item.category}
            text={item.text}
            comments={item.comments}
            created={item.created}
            url={item.url}
            votes={item.votes}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaea'
  },
  categoryPicker: {
    backgroundColor: 'white',
    padding: 5
  }
})

export default Home
