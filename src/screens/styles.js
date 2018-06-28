// Global styles that change according to screen width
import store from '../boot/configureStore'

const headingFontSizes = {
  small: 12,
  medium: 14,
  large: 16,
  huge: 20,
}

const mainTextFontSizes = {
  small: 10,
  medium: 12,
  large: 14,
  huge: 17,
}

function buildStyle() {
  const { deviceSize } = store().getState()
  return {
    headingStyle: {
      fontSize: headingFontSizes[deviceSize],
      fontWeight: 'bold',
      padding: 10,
    },
    mainTextStyle: {
      fontSize: mainTextFontSizes[deviceSize],
    },
    listMenuStyle: {
      height: '100%',
      margin: 8,
      elevation: 2,
      marginTop: 0,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#EEEEEE',
    },
  }
}

store().subscribe(buildStyle)
export default buildStyle()
