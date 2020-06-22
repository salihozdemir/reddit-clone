import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, View } from 'react-native'

import { FetchContext } from '../context/fetch-context'

import Post from '../components/post'

const PostDetail = ({ route }) => {
  const fetchContext = React.useContext(FetchContext)
  const [post, setPost] = React.useState(null)

  const { postId } = route.params

  const getPostData = React.useCallback(async () => {
    const { data } = await fetchContext.authAxios.get(`post/${postId}`)
    setPost(data)
  }, [fetchContext.authAxios, postId])

  React.useEffect(() => {
    getPostData()
  }, [getPostData])

  return (
    <View as={SafeAreaView} style={styles.container}>
      {post ? (
        <Post
          score={post.score}
          type={post.type}
          title={post.title}
          author={post.author}
          category={post.category}
          text={post.text}
          comments={post.comments}
          created={post.created}
          url={post.url}
          votes={post.votes}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  }
})

export default PostDetail
