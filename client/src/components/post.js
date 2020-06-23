import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
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
        <Text style={{ color: colors.grey }}>{category} by </Text>
        <Text style={{ color: colors.blue }}>{author?.username}</Text>
      </View>
      <TouchableOpacity onPress={navigationDetail}>
        <Text style={[styles.title, { color: colors.grey }]}>{title}</Text>
        <Text numberOfLines={5} style={{ color: colors.grey }}>
          {type === 'link' ? url : text}
        </Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View style={styles.centerAlign}>
          <TouchableOpacity onPress={isUpVoted() ? unVote : upVote}>
            <ArrowUp color={isUpVoted() ? colors.upVote : colors.grey} />
          </TouchableOpacity>
          <Text>{score}</Text>
          <TouchableOpacity onPress={isDownVoted() ? unVote : downVote}>
            <ArrowDown color={isDownVoted() ? colors.downVote : colors.grey} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.centerAlign}>
          <MessageSquare color={colors.grey} />
          <Text style={styles.textColor}> {comments?.length}</Text>
        </TouchableOpacity>
        <Text>{moment(created).fromNow(true)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 7
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 7,
    fontSize: 13
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
    fontSize: 18
  }
})

export default Post
