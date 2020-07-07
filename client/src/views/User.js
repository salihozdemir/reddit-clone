import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme, useNavigation } from '@react-navigation/native'

import axios from '../utils/fetcher'
import { AuthContext } from '../context/authContext'
import { ThemeContext } from '../context/themeSwichContext'

import { LogOut, Moon, Sun } from '../components/icons'
import Post from '../components/Post'
import PostLoader from '../components/PostLoader'

const HeaderComponent = ({ username, postCount }) => {
  const { signOut, authState } = React.useContext(AuthContext)
  const { theme, changeTheme } = React.useContext(ThemeContext)
  const { colors } = useTheme()
  const navigation = useNavigation()

  return (
    <View style={[styles.userInfo, { backgroundColor: colors.bgColor }]}>
      <View style={styles.infoBox}>
        <Text style={[styles.label, { color: colors.text }]}>Username</Text>
        <Text style={{ color: colors.text }}>{username ?? authState.userInfo.username}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.label, { color: colors.text }]}>Post Count</Text>
        <Text style={{ color: colors.text }}>{postCount}</Text>
      </View>
      {username === authState.userInfo.username && (
        <>
          <View style={[styles.line, { borderColor: colors.border }]} />
          <TouchableOpacity
            onPress={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
            style={styles.infoBox}
          >
            {theme === 'light' ? <Moon color={colors.icon} /> : <Sun color={colors.icon} />}
            <Text style={{ color: colors.text }}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => {
              signOut()
              navigation.navigate('Home')
            }}
          >
            <LogOut color={colors.red} />
            <Text style={{ color: colors.red }}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const User = ({ route }) => {
  const { authState } = React.useContext(AuthContext)
  const { colors } = useTheme()

  const [isLoading, setIsLoaading] = React.useState(false)
  const [userPosts, setuserPosts] = React.useState(null)

  const username = route.params?.username

  const getUserPostDetail = React.useCallback(async () => {
    setIsLoaading(true)
    const { data } = await axios.get(`user/${username || authState.userInfo.username}`)
    setuserPosts(data)
    setIsLoaading(false)
  }, [authState.userInfo.username, username])

  React.useEffect(() => {
    getUserPostDetail()
  }, [getUserPostDetail])

  const deletePost = async (postId, index) => {
    setIsLoaading(true)
    const { status } = await axios.delete(`post/${postId}`)
    if (status === 200) {
      setuserPosts(prevData => {
        prevData.splice(index, 1)
        return prevData
      })
    }
    setIsLoaading(false)
  }

  return (
    <View as={SafeAreaView} style={styles.boxCenter}>
      {userPosts ? (
        <FlatList
          data={userPosts.sort((a, b) => a.created < b.created)}
          extraData={isLoading}
          refreshing={isLoading}
          onRefresh={() => getUserPostDetail()}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.text }]}>Ups! Not found any post!</Text>
          }
          ListHeaderComponent={<HeaderComponent username={username} postCount={userPosts.length} />}
          stickyHeaderIndices={[0]}
          ListHeaderComponentStyle={styles.headerComponentStyle}
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
              setData={setuserPosts}
              deleteButton={true}
              deletePost={() => deletePost(item.id, index)}
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
    alignItems: 'center',
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
  },
  headerComponentStyle: {
    marginBottom: 7,
    elevation: 3
  },
  empty: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 22
  },
  line: {
    borderLeftWidth: 1,
    height: '100%'
  }
})

export default User
