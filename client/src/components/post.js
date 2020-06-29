import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useTheme } from '@react-navigation/native'
import moment from 'moment'

import axios from '../utils/fetcher'

import { ArrowDown, ArrowUp, MessageSquare } from './icons/index'

const Post = ({
  index,
  postId,
  userId,
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
  views,
  setIsLoaading,
  setData
}) => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const isUpVoted = () => {
    return votes.find(v => v.user === userId)?.vote === 1
  }

  const isDownVoted = () => {
    return votes.find(v => v.user === userId)?.vote === -1
  }

  const upVote = async () => {
    setIsLoaading(true)
    const { data } = await axios.get(`post/${postId}/upvote`)
    if (index) {
      setData(prevData => {
        prevData[index] = data
        return prevData
      })
    } else {
      setData(data)
    }
    setIsLoaading(false)
  }

  const downVote = async () => {
    setIsLoaading(true)
    const { data } = await axios.get(`post/${postId}/downvote`)
    if (index) {
      setData(prevData => {
        prevData[index] = data
        return prevData
      })
    } else {
      setData(data)
    }
    setIsLoaading(false)
  }

  const unVote = async () => {
    setIsLoaading(true)
    const { data } = await axios.get(`post/${postId}/unvote`)
    if (index) {
      setData(prevData => {
        prevData[index] = data
        return prevData
      })
    } else {
      setData(data)
    }
    setIsLoaading(false)
  }

  return (
    <View
      as={SafeAreaView}
      style={[styles.container, { backgroundColor: colors.bgColor }]}
    >
      <View style={styles.headerContainer}>
        <Text style={{ color: colors.grey }}>/{category} </Text>
        <Text
          style={{ color: colors.blue }}
          onPress={() =>
            navigation.navigate('User', { username: author.username })
          }
        >
          @{author?.username} ·{' '}
        </Text>
        <Text>{moment(created).fromNow()}</Text>
      </View>
      <Text
        style={[styles.title, { color: colors.grey }]}
        onPress={() => navigation.navigate('PostDetail', { postId, category })}
      >
        {title}
      </Text>
      <Text
        numberOfLines={10}
        style={{ color: colors.grey }}
        onPress={() => navigation.navigate('PostDetail', { postId, category })}
      >
        {type === 'link' ? url : text}
      </Text>
      <View style={styles.bottomContainer}>
        <View style={styles.centerAlign}>
          <TouchableOpacity onPress={() => (isUpVoted() ? unVote() : upVote())}>
            <ArrowUp
              width={22}
              height={22}
              strokeWidth={4}
              color={isUpVoted() ? colors.upVote : colors.icon}
            />
          </TouchableOpacity>
          <Text style={styles.score}>{score}</Text>
          <TouchableOpacity
            onPress={() => (isDownVoted() ? unVote() : downVote())}
          >
            <ArrowDown
              width={22}
              height={22}
              strokeWidth={4}
              color={isDownVoted() ? colors.downVote : colors.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.centerAlign}>
          <MessageSquare
            color={colors.icon}
            style={styles.commentIcon}
            width={20}
            height={20}
            strokeWidth={3}
          />
          <Text style={styles.icon}> {comments?.length}</Text>
        </TouchableOpacity>
        <Text>{views} views</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 7,
    elevation: 1
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 7,
    fontSize: 13
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  centerAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  score: {
    marginHorizontal: 5
  },
  commentIcon: {
    marginBottom: -3
  }
})

export default Post
