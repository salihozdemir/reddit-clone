import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
  url
}) => {
  console.log('text', text)
  return (
    <View as={SafeAreaView} style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.user}>{author?.username}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text>{type === 'link' ? url : text}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.centerAlign}>
          <TouchableOpacity>
            <ArrowDown color="black" />
          </TouchableOpacity>
          <Text>{score}</Text>
          <TouchableOpacity>
            <ArrowUp color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.centerAlign}>
          <MessageSquare color="black" />
          <Text>{comments?.length}</Text>
        </TouchableOpacity>
        <Text>{created}</Text>
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
    justifyContent: 'space-between'
  },
  centerAlign: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  category: {
    color: '#696969',
    fontSize: 12
  },
  user: {
    color: 'cornflowerblue',
    fontSize: 13
  }
})

export default Post
