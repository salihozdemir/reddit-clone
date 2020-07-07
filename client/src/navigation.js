import 'react-native-gesture-handler'
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators
} from '@react-navigation/stack'

import { ThemeContext } from './context/themeSwichContext'
import DefaultTheme from './constants/default-theme'
import DarkTheme from './constants/dark-theme'

import TabBar from './components/TabBar'
import HomeScreen from './views/Home'
import PostDetail from './views/PostDetail'
import CreatePostScreen from './views/CreatePost'
import UserScreen from './views/User'
import SignModal from './views/SignModal'
import SignInScreen from './views/SignIn'
import SignUpScreen from './views/SignUp'

const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SignStack = createStackNavigator()
const RootStack = createStackNavigator()

function SignScreens() {
  return (
    <SignStack.Navigator
      headerMode="screen"
      screenOptions={{
        initialRouteName: 'SignModal',
        gestureEnabled: true,
        gestureDirection: 'vertical',
        ...TransitionPresets.ModalSlideFromBottomIOS,
        cardStyle: {
          backgroundColor: 'transparent'
        },
        headerShown: false
      }}
    >
      <SignStack.Screen name="SignModal" component={SignModal} />
      <SignStack.Screen name="SignUp" component={SignUpScreen} />
      <SignStack.Screen name="SignIn" component={SignInScreen} />
    </SignStack.Navigator>
  )
}

function HomeScreens() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={({ route }) => ({
          headerTitle: route.params.category,
          headerStyle: { height: 40 },
          headerTitleStyle: {
            fontSize: 16
          },
          headerTitleAlign: 'center'
        })}
      />
    </HomeStack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        animationEnabled: true
      }}
    >
      <Tab.Screen name="Home" component={HomeScreens} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  )
}

function RootScreen() {
  const { theme } = React.useContext(ThemeContext)
  return (
    <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          gestureEnabled: true,
          gestureDirection: 'vertical'
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
