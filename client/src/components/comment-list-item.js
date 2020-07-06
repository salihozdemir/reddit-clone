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
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.authorName, { color: colors.blue }]}>
          {author?.username}
        </Text>
        <View style={styles.headerRight}>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {moment(created).fromNow()}
          </Text>
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
        <Text style={[styles.regularFont, { color: colors.text }]}>{body}</Text>
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
    alignItems: 'center',
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
    marginRight: 10,
    fontFamily: 'OpenSans-Bold'
  },
  trash: {
    marginLeft: 10
  },
  regularFont: {
    fontFamily: 'OpenSans-Regular'
  },
  dateText: {
    fontFamily: 'OpenSans-Italic',
    fontSize: 12
  }
})

export default CommentListItem
