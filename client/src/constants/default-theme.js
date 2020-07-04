import { DefaultTheme } from '@react-navigation/native'

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: '#6495ed',
    text: '#424242',
    border: '#ecedf0',
    green: '#80bdab',
    red: '#d31f4f',
    white: 'white',
    bgColor: 'white',
    signUpButton: '#ce815e',
    signInButton: '#6495ed',
    icon: '#888a8c',
    loader: '#eeeeee',
    postBorder: '#ecedf0'
  }
}

export default customDefaultTheme
