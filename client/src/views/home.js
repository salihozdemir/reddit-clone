import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FetchContext } from '../context/fetch-context'
import Post from '../components/post'

const Home = () => {
  const fetchContext = React.useContext(FetchContext)
  const [postsData, setPostsData] = React.useState([])

  React.useEffect(() => {
    const getPostData = async () => {
      const { data } = await fetchContext.authAxios.get('posts')
      setPostsData(data)
    }
    getPostData()
  }, [fetchContext])

  return (
    <View as={SafeAreaView} style={styles.container}>
      <FlatList
        data={postsData}
        keyExtractor={item => item.id}
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
        ListHeaderComponent={<Text>Son Aramalar</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaea'
  }
})

export default Home
