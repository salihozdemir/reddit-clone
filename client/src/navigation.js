import 'react-native-gesture-handler'
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TransitionSpecs } from '@react-navigation/stack'

import TabBar from './components/tab-bar'
import HomeScreen from './views/home'
import CreatePostScreen from './views/create-post'
import UserScreen from './views/user'
import SignInScreen from './views/sign-in'
import SignUpScreen from './views/sign-up'
import SignModal from './components/sign-modal'

const Tab = createBottomTabNavigator()
const RootStack = createStackNavigator()
const SignStack = createStackNavigator()

function Sign() {
  return (
    <SignStack.Navigator>
      <SignStack.Screen name="SignModal" component={SignModal} />
      <SignStack.Screen name="SignUp" component={SignUpScreen} />
      <SignStack.Screen name="SignIn" component={SignInScreen} />
    </SignStack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="CreatePost"
        options={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec
          }
        }}
        component={CreatePostScreen}
      />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  )
}

function RootStackScreen() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Sign" component={Sign} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackScreen
