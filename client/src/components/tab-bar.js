import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { Home, PlusSquare, User } from './icons/index'

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.button}
          >
            {label === 'Home' && (
              <Home color={isFocused ? 'cornflowerblue' : '#424242'} />
            )}
            {label === 'CreatePost' && (
              <PlusSquare color={isFocused ? 'cornflowerblue' : '#424242'} />
            )}
            {label === 'User' && (
              <User color={isFocused ? 'cornflowerblue' : '#424242'} />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    elevation: 23
  },
  button: {
    flex: 1,
    alignItems: 'center'
  }
})

export default TabBar
