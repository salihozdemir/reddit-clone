import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import axios from '../utils/fetcher'
import { AuthContext } from '../context/auth-context'

import { LogOut } from '../components/icons'
import Post from '../components/post'
import PostLoader from '../components/post-loader'

const User = ({ navigation, route }) => {
  const { authContext, authState } = React.useContext(AuthContext)
  const { colors } = useTheme()

  const [isLoading, setIsLoaading] = React.useState(false)
  const [userPosts, setuserPosts] = React.useState([])

  const username = route.params?.username

  const getUserPostDetail = async () => {
    setIsLoaading(true)
    const { data } = await axios.get(
      `user/${username || authState.userInfo.username}`
    )
    setuserPosts(data)
    setIsLoaading(false)
  }

  React.useEffect(() => {
    getUserPostDetail()
  }, [])

  const upVote = async (postId, index) => {
    setIsLoaading(true)
    const { data } = await axios.get(`post/${postId}/upvote`)
    console.log(data)
    userPosts[index] = data
    setIsLoaading(false)
  }

  const downVote = async (postId, index) => {
    setIsLoaading(true)
    const { data } = await axios.get(`post/${postId}/downvote`)
    userPosts[index] = data
    setIsLoaading(false)
  }

  const unVote = async (postId, index) => {
    setIsLoaading(true)
    const { data } = await axios.get(`post/${postId}/unvote`)
    userPosts[index] = data
    setIsLoaading(false)
  }

  const navigationDetail = (postId, category) => {
    navigation.navigate('PostDetail', { postId, category })
  }

  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      <View style={[styles.userInfo, { backgroundColor: colors.bgColor }]}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Username</Text>
          <Text>{username ?? authState.userInfo.username}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Post Count</Text>
          <Text>{userPosts?.length}</Text>
        </View>
        {username && username === authState.userInfo.username && (
          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => {
              authContext.signOut()
              navigation.navigate('Home')
            }}
          >
            <LogOut color={colors.downVote} />
            <Text style={{ color: colors.downVote }}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
      {userPosts.length !== 0 ? (
        <FlatList
          data={userPosts}
          extraData={isLoading}
          refreshing={isLoading}
          onRefresh={() => getUserPostDetail()}
          keyExtractor={item => item.id}
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
              navigationDetail={() => navigationDetail(item.id, item.category)}
            />
          )}
        />
      ) : (
          <>
            {[1, 2, 3, 4, 5].map(i => (
              <PostLoader key={i} />
            ))}
          </>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1
  },
  text: {
    fontSize: 30,
    color: 'red'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    elevation: 3
  },
  infoBox: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default User
