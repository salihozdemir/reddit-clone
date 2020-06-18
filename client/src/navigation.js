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
import SignModal from './components/sign-modal'
import SignInScreen from './views/sign-in'
import SignUpScreen from './views/sign-up'

const Tab = createBottomTabNavigator()
const UserStack = createStackNavigator()
const CreatePostStack = createStackNavigator()

function UserScreens() {
  const { authState } = React.useContext(AuthContext)
  return (
    <UserStack.Navigator mode="modal">
      {authState.token ? (
        <UserStack.Screen name="UserScreen" component={UserScreen} />
      ) : (
        <>
          <UserStack.Screen
            name="SignModal"
            component={SignModal}
            options={{ headerShown: false }}
          />
          <UserStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerTitle: '',
              headerTransparent: true
            }}
          />
          <UserStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerTitle: '',
              headerTransparent: true
            }}
          />
        </>
      )}
    </UserStack.Navigator>
  )
}

function CreatePostScreens() {
  const { authState } = React.useContext(AuthContext)
  return (
    <CreatePostStack.Navigator mode="modal">
      {authState.token ? (
        <CreatePostStack.Screen
          name="CreatePost"
          component={CreatePostScreen}
        />
      ) : (
        <>
          <CreatePostStack.Screen
            name="SignModal"
            component={SignModal}
            options={{ headerShown: false }}
          />
          <CreatePostStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerTitle: '',
              headerTransparent: true
            }}
          />
          <CreatePostStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerTitle: '',
              headerTransparent: true
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="CreatePost" component={CreatePostScreens} />
        <Tab.Screen name="User" component={UserScreens} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MyTabs
