import 'react-native-gesture-handler'
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import DefaultTheme from './constants/default-theme'

import TabBar from './components/tab-bar'
import HomeScreen from './views/home'
import PostDetail from './views/post-detail'
import CreatePostScreen from './views/create-post'
import UserScreen from './views/user'
import SignModal from './components/sign-modal'
import SignInScreen from './views/sign-in'
import SignUpScreen from './views/sign-up'

const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SignStack = createStackNavigator()
const RootStack = createStackNavigator()

function SignScreens() {
  return (
    <SignStack.Navigator headerMode="screen">
      <SignStack.Screen
        name="SignModal"
        component={SignModal}
        options={{
          headerShown: false
        }}
      />
      <SignStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: '',
          headerTransparent: true
        }}
      />
      <SignStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: '',
          headerTransparent: true
        }}
      />
    </SignStack.Navigator>
  )
}

function HomeScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          headerTitle: '',
          headerTransparent: true
        }}
      />
    </HomeStack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreens} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  )
}

function RootScreen() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1]
              })
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp'
              })
            }
          })
        }}
        mode="modal"
      >
        <RootStack.Screen name="Tab" component={MyTabs} />
        <RootStack.Screen name="SignModal" component={SignScreens} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootScreen
