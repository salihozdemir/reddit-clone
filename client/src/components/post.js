import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'

import { useTheme } from '@react-navigation/native'
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
  views,
  upVote,
  downVote,
  unVote,
  navigationDetail
}) => {
  const { colors } = useTheme()

  const { authState } = React.useContext(AuthContext)
  const { id } = authState.userInfo

  const isUpVoted = () => {
    return votes?.find(v => v.user === id)?.vote === 1
  }

  const isDownVoted = () => {
    return votes?.find(v => v.user === id)?.vote === -1
  }

  return (
    <View
      as={SafeAreaView}
      style={[styles.container, { backgroundColor: colors.bgColor }]}
    >
      <View style={styles.headerContainer}>
        <Text style={{ color: colors.grey }}>/{category} </Text>
        <Text style={{ color: colors.blue }}>@{author?.username} · </Text>
        <Text>{moment(created).fromNow()}</Text>
      </View>
      <TouchableWithoutFeedback onPress={navigationDetail}>
        <Text style={[styles.title, { color: colors.grey }]}>{title}</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={navigationDetail}>
        <Text numberOfLines={10} style={{ color: colors.grey }}>
          {type === 'link' ? url : text}
        </Text>
      </TouchableWithoutFeedback>
      <View style={styles.bottomContainer}>
        <View style={styles.centerAlign}>
          <TouchableOpacity onPress={isUpVoted() ? unVote : upVote}>
            <ArrowUp
              width={22}
              height={22}
              strokeWidth={4}
              color={isUpVoted() ? colors.upVote : colors.icon}
            />
          </TouchableOpacity>
          <Text style={styles.score}>{score}</Text>
          <TouchableOpacity onPress={isDownVoted() ? unVote : downVote}>
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
