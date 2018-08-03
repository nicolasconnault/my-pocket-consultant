import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const portraitWidth = (height > width) ? width : height

const commonStyles = {
  imageBackgroundStyle: {
    flex: 1,
    width: '100%',
    height: 200,
    flexDirection: 'column',
  },
}

const portraitStyles = {
  ...commonStyles,
  mainContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}

const landscapeStyles = {
  ...commonStyles,
  mainContainerStyle: {
    paddingLeft: 40,
    paddingRight: 40,
  },
}

export { landscapeStyles, portraitStyles }
