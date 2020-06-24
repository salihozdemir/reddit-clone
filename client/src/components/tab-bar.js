import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { AuthContext } from '../context/auth-context'
import { Home, PlusSquare, User } from './icons/index'

function TabBar({ state, descriptors, navigation }) {
  const { authState } = React.useContext(AuthContext)
  const { colors } = useTheme()

  return (
    <View style={[styles.tabBarContainer, { backgroundColor: colors.bgColor }]}>
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
            if (authState.token) {
              navigation.navigate(route.name)
            } else {
              navigation.navigate('SignModal')
            }
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.button}
          >
            {label === 'Home' && (
              <Home color={isFocused ? colors.blue : colors.grey} />
            )}
            {label === 'CreatePost' && (
              <PlusSquare color={isFocused ? colors.blue : colors.grey} />
            )}
            {label === 'User' && (
              <User color={isFocused ? colors.blue : colors.grey} />
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
    height: 28,
    elevation: 10
  },
  button: {
    flex: 1,
    alignItems: 'center'
  }
})

export default TabBar
