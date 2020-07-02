import { DefaultTheme } from '@react-navigation/native'

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: '#6495ed',
    grey: '#424242',
    lightGrey: '#ecedf0',
    green: '#80bdab',
    red: '#d31f4f',
    white: 'white',
    black: 'black',
    bgColor: 'white',
    signInButton: '#ce815e',
    signUpButton: '#6495ed',
    icon: '#888a8c'
  }
}

export default customDefaultTheme
