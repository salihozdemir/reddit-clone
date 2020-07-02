import React from 'react'
import { StyleSheet, View, FlatList, Text, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import axios from '../utils/fetcher'
import { AuthContext } from '../context/auth-context'
import { ThemeContext } from '../context/theme-swich-context'

import CategoryPicker from '../components/category-picker'
import Post from '../components/post'
import PostLoader from '../components/post-loader'
import CategoryLoader from '../components/category-loader.js'

const Home = () => {
  const { authState } = React.useContext(AuthContext)
  const { theme } = React.useContext(ThemeContext)
  const { colors } = useTheme()

  const [postData, setPostData] = React.useState(null)
  const [category, setCategory] = React.useState('all')
  const [isLoading, setIsLoaading] = React.useState(false)

  const getPostData = React.useCallback(async () => {
    setIsLoaading(true)
    const { data } = await axios.get(
      !category || category === 'all' ? 'posts' : `posts/${category}`
    )
    setPostData(data)
    setIsLoaading(false)
  }, [category])

  React.useEffect(() => {
    getPostData()
  }, [getPostData])

  return (
    <View as={SafeAreaView} style={styles.container}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      {postData ? (
        <FlatList
          data={postData}
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
            <Text style={[styles.empty, { color: colors.text }]}>
              Ups! Not found any post!
            </Text>
          }
          renderItem={({ item, index }) => (
            <Post
              index={index}
              postId={item.id}
              userId={authState.userInfo.id}
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
              setIsLoaading={setIsLoaading}
              setData={setPostData}
              deleteButton={false}
            />
          )}
        />
      ) : (
        <>
          <CategoryLoader />
          {[1, 2, 3, 4, 5].map(i => (
            <PostLoader key={i} />
          ))}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  categoryPicker: {
    padding: 5,
    marginVertical: 7,
    elevation: 3
  },
  empty: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 22
  }
})

export default Home
