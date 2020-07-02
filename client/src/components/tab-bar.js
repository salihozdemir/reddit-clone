import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { AuthContext } from '../context/auth-context'
import { Home, PlusSquare, User } from './icons/index'

function TabBar({ state, descriptors, navigation }) {
  const { authState } = React.useContext(AuthContext)
  const { colors } = useTheme()

  return (
    <View
      style={[
        styles.tabBarContainer,
        { backgroundColor: colors.bgColor, borderColor: colors.border }
      ]}
    >
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
              navigation.navigate(route.name, {
                username: authState.userInfo.username
              })
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
              <Home color={isFocused ? colors.blue : colors.text} />
            )}
            {label === 'CreatePost' && (
              <PlusSquare color={isFocused ? colors.blue : colors.text} />
            )}
            {label === 'User' && (
              <User color={isFocused ? colors.blue : colors.text} />
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
    elevation: 2,
    borderTopWidth: 1
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5
  }
})

export default TabBar
