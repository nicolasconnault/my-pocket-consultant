import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const portraitWidth = (height > width) ? width : height

const commonStyles = {
  imageBackgroundStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  logoContainerStyle: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  passwordReminderStyle: {
    color: '#FFFFFF',
  },
  passwordReminderContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
  },
  buttonStyle: {
    container: {
      flex: 0.5,
      marginTop: 10,
    },
  },
  signupButtonStyle: {
    text: {
      color: '#FFFFFF',
    },
  },
}

const portraitStyles = {
  ...commonStyles,
  mainContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoStyle: {
    height: '90%',
    flex: 1,
  },
  logoContainerStyle: {
    ...commonStyles.logoContainerStyle,
    height: portraitWidth * 0.29,
  },
}

const landscapeStyles = {
  ...commonStyles,
  mainContainerStyle: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  logoContainerStyle: {
    ...commonStyles.logoContainerStyle,
    height: 70,
  },
  logoStyle: {
    height: 70,
    width: 270,
  },
}

export { landscapeStyles, portraitStyles }
