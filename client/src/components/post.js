import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'

import { AuthContext } from '../context/auth-context'
import { ArrowDown, ArrowUp, MessageSquare } from './icons/index'

const Post = ({
  score,
  type,
  title,
  author,
  category,
  text,
  comments,
  created,
  url,
  votes,
  upVote,
  downVote,
  unVote,
  navigationDetail
}) => {
  const { authState } = React.useContext(AuthContext)
  const { id } = authState.userInfo

  const isUpVoted = () => {
    return votes?.find(v => v.user === id)?.vote === 1
  }

  const isDownVoted = () => {
    return votes?.find(v => v.user === id)?.vote === -1
  }

  return (
    <View as={SafeAreaView} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.category}>{category} by </Text>
        <Text style={styles.user}>{author?.username}</Text>
      </View>
      <TouchableOpacity onPress={navigationDetail}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={5} style={styles.textColor}>
          {type === 'link' ? url : text}
        </Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View style={styles.centerAlign}>
          <TouchableOpacity onPress={isUpVoted() ? unVote : upVote}>
            <ArrowUp color={isUpVoted() ? '#80bdab' : '#424242'} />
          </TouchableOpacity>
          <Text>{score}</Text>
          <TouchableOpacity onPress={isDownVoted() ? unVote : downVote}>
            <ArrowDown color={isDownVoted() ? '#900c3f' : '#424242'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.centerAlign}>
          <MessageSquare color="#424242" />
          <Text style={styles.textColor}> {comments?.length}</Text>
        </TouchableOpacity>
        <Text>{moment(created).fromNow(true)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    marginTop: 7
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  centerAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#424242'
  },
  headerContainer: {
    flexDirection: 'row',
    fontSize: 13
  },
  category: {
    color: '#696969'
  },
  user: {
    color: 'cornflowerblue'
  },
  textColor: {
    color: '#424242'
  }
})

export default Post
