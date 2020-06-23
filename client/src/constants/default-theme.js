import { DefaultTheme } from '@react-navigation/native'

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: '#6495ed',
    grey: '#424242',
    lightGrey: '#ecedf0',
    upVote: '#80bdab',
    downVote: '#d31f4f',
    buttonText: 'white',
    bgColor: 'white',
    signInButton: '#ce815e',
    SignUpButton: '#6495ed'
  }
}

export default customDefaultTheme
