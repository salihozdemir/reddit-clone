import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { FetchContext } from '../context/fetch-context'

import Post from '../components/post'
import CommentListItem from '../components/comment-list-item'

const PostDetail = ({ route }) => {
  const fetchContext = React.useContext(FetchContext)
  const [post, setPost] = React.useState(null)
  const [isLoading, setIsLoaading] = React.useState(false)

  const { postId } = route.params

  const getPostData = React.useCallback(async () => {
    setIsLoaading(true)
    const { data } = await fetchContext.authAxios.get(`post/${postId}`)
    setPost(data)
    setIsLoaading(false)
  }, [fetchContext.authAxios, postId])

  React.useEffect(() => {
    getPostData()
  }, [getPostData])

  const upVote = async postId => {
    const { data } = await fetchContext.authAxios.get(`post/${postId}/upvote`)
    setPost(data)
  }

  const downVote = async postId => {
    const { data } = await fetchContext.authAxios.get(`post/${postId}/downvote`)
    setPost(data)
  }

  const unVote = async postId => {
    const { data } = await fetchContext.authAxios.get(`post/${postId}/unvote`)
    setPost(data)
  }

  return (
    <View as={SafeAreaView} style={styles.container}>
      {post ? (
        <>
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
            upVote={() => upVote(post.id)}
            downVote={() => downVote(post.id)}
            unVote={() => unVote(post.id)}
          />
          <FlatList
            data={post.comments}
            refreshing={isLoading}
            onRefresh={() => getPostData()}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <CommentListItem
                body={item.body}
                author={item.author}
                created={item.created}
              />
            )}
          />
        </>
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
