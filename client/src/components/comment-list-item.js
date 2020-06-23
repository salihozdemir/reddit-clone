import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import moment from 'moment'

const CommentListItem = ({ body, author, created }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      <View style={[styles.header, { borderBottomColor: colors.lightGrey }]}>
        <Text style={[styles.authorName, { color: colors.blue }]}>
          {author?.username}
        </Text>
        <Text>{moment(created).fromNow(true)}</Text>
      </View>
      <View style={styles.body}>
        <Text>{body}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1
  },
  body: {
    marginTop: 5,
    padding: 5
  },
  authorName: {
    fontWeight: 'bold',
    marginRight: 10
  }
})

export default CommentListItem
