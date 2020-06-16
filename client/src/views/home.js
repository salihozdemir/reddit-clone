import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Post from '../components/post'

const Home = () => {
  const [postsData, setPostsData] = React.useState([])

  React.useEffect(() => {
    const getPostData = async () => {
      const response = await fetch('http://172.17.0.1:8080/api/posts')
      const data = await response.json()
      console.log(data)
      setPostsData(data)
    }
    getPostData()
  }, [])

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
