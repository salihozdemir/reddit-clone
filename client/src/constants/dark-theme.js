import { DarkTheme } from '@react-navigation/native'

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#18191a',
    blue: '#6495ed',
    grey: '#e0dede',
    border: '#888888',
    green: '#438a5e',
    red: '#d31f4f',
    white: 'white',
    bgColor: '#1b1b2f',
    signUpButton: '#ce815e',
    signInButton: '#6495ed',
    icon: '#888a8c',
    loader: '#393e46'
  }
}

export default customDarkTheme
