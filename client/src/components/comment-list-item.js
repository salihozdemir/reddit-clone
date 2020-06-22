import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import moment from 'moment'

const commentListItem = ({ body, author, created }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.authorName}>{author?.username}</Text>
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
    marginTop: 10,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ecedf0'
  },
  body: {
    marginTop: 5,
    padding: 5
  },
  authorName: {
    color: 'cornflowerblue',
    fontWeight: 'bold',
    marginRight: 10
  }
})

export default commentListItem
