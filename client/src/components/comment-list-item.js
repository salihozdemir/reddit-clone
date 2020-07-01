import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

import moment from 'moment'

import { AuthContext } from '../context/auth-context'

import { Trash } from '../components/icons'

const CommentListItem = ({ body, author, created, deleteComment }) => {
  const { colors } = useTheme()
  const { authState } = React.useContext(AuthContext)

  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      <View style={[styles.header, { borderBottomColor: colors.lightGrey }]}>
        <Text style={[styles.authorName, { color: colors.blue }]}>
          {author?.username}
        </Text>
        <View style={styles.headerRight}>
          <Text>{moment(created).fromNow()}</Text>
          {author?.id === authState.userInfo.id && (
            <TouchableOpacity
              style={styles.trash}
              activeOpacity={0.5}
              onPress={deleteComment}
            >
              <Trash color={colors.red} width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>
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
    marginBottom: 7,
    elevation: 1,
    paddingHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1
  },
  headerRight: {
    flexDirection: 'row'
  },
  body: {
    marginTop: 5,
    padding: 5
  },
  authorName: {
    fontWeight: 'bold',
    marginRight: 10
  },
  trash: {
    marginLeft: 10
  }
})

export default CommentListItem
