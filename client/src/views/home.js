import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import CategoryPicker from '../components/category-picker'
import { FetchContext } from '../context/fetch-context'
import Post from '../components/post'

const Home = ({ navigation }) => {
  const fetchContext = React.useContext(FetchContext)
  const { colors } = useTheme()

  const [postsData, setPostsData] = React.useState([])
  const [category, setCategory] = React.useState('all')
  const [isLoading, setIsLoaading] = React.useState(false)

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

  const upVote = async (postId, index) => {
    setIsLoaading(true)
    const { data } = await fetchContext.authAxios.get(`post/${postId}/upvote`)
    postsData[index] = data
    setIsLoaading(false)
  }

  const downVote = async (postId, index) => {
    setIsLoaading(true)
    const { data } = await fetchContext.authAxios.get(`post/${postId}/downvote`)
    postsData[index] = data
    setIsLoaading(false)
  }

  const unVote = async (postId, index) => {
    setIsLoaading(true)
    const { data } = await fetchContext.authAxios.get(`post/${postId}/unvote`)
    postsData[index] = data
    setIsLoaading(false)
  }

  const navigationDetail = postId => {
    navigation.navigate('PostDetail', { postId })
  }

  return (
    <View as={SafeAreaView} style={styles.container}>
      <FlatList
        data={postsData}
        extraData={isLoading}
        refreshing={isLoading}
        onRefresh={() => getPostData()}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <CategoryPicker selected={category} onClick={setCategory} addAll />
        }
        ListHeaderComponentStyle={[
          styles.categoryPicker,
          { backgroundColor: colors.bgColor }
        ]}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.grey }]}>
            Ups! Not found any post!
          </Text>
        }
        renderItem={({ item, index }) => (
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
            views={item.views}
            upVote={() => upVote(item.id, index)}
            downVote={() => downVote(item.id, index)}
            unVote={() => unVote(item.id, index)}
            navigationDetail={() => navigationDetail(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  categoryPicker: {
    padding: 5
  },
  empty: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 22
  }
})

export default Home
