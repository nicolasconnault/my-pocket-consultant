import store from './boot/configureStore'
import { CUSTOMER_MODE_COLOR } from './config'

const toolbarContainerHeights = {
  small: 45,
  medium: 50,
  large: 60,
  huge: 70,
}
const toolbarTitleTextFontSizes = {
  small: 15,
  medium: 17,
  large: 19,
  huge: 21,
}
const buttonTextFontSizes = {
  small: 11,
  medium: 14,
  large: 16,
  huge: 18,
}

function buildStyle() {
  const { deviceSize } = store().getState()
  return {
    palette: {
      primaryColor: CUSTOMER_MODE_COLOR,
    },
    toolbar: {
      container: {
        height: toolbarContainerHeights[deviceSize],
      },
      titleText: {
        fontSize: toolbarTitleTextFontSizes[deviceSize],
      },
    },
    button: {
      text: {
        fontSize: buttonTextFontSizes[deviceSize],
      },
    },
  }
}

store().subscribe(buildStyle)
export default buildStyle()
