import 'react-native-gesture-handler'
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TransitionSpecs } from '@react-navigation/stack'

import { AuthContext } from './context/auth-context'

import TabBar from './components/tab-bar'
import HomeScreen from './views/home'
import CreatePostScreen from './views/create-post'
import UserScreen from './views/user'
import SignInScreen from './views/sign-in'
import SignUpScreen from './views/sign-up'
import SignModal from './components/sign-modal'

const Tab = createBottomTabNavigator()
const UserStack = createStackNavigator()
const CreatePostStack = createStackNavigator()

function User() {
  const { authState } = React.useContext(AuthContext)
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false
      }}
      mode="modal"
    >
      {authState.token ? (
        <UserStack.Screen name="User" component={UserScreen} />
      ) : (
        <>
          <CreatePostStack.Screen name="SignModal" component={SignModal} />
          <UserStack.Screen name="SignUp" component={SignUpScreen} />
          <UserStack.Screen name="SignIn" component={SignInScreen} />
        </>
      )}
    </UserStack.Navigator>
  )
}

function CreatePost() {
  const { authState } = React.useContext(AuthContext)
  return (
    <CreatePostStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {authState.token ? (
        <CreatePostStack.Screen
          name="CreatePost"
          component={CreatePostScreen}
        />
      ) : (
        <>
          <CreatePostStack.Screen
            name="SignModal"
            options={{
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec
              }
            }}
            component={SignModal}
          />
          <CreatePostStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec
              }
            }}
          />
          <CreatePostStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec
              }
            }}
          />
        </>
      )}
    </CreatePostStack.Navigator>
  )
}

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen
          name="CreatePost"
          options={{
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec
            }
          }}
          component={CreatePost}
        />
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MyTabs
