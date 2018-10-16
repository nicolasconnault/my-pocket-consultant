import store from './boot/configureStore'
import { CONSULTANT_MODE_COLOR } from './config'

const toolbarContainerHeights = {
  small: 45,
  medium: 50,
  large: 60,
  huge: 70,
}

function buildStyle() {
  const { deviceSize } = store().getState()
  return {
    palette: {
      primaryColor: CONSULTANT_MODE_COLOR,
    },
    toolbar: {
      container: {
        height: toolbarContainerHeights[deviceSize],
      },
    },
    snackbar: {
      text: {
        color: '#CCCCCC',
      },
    },
  }
}
store().subscribe(buildStyle)
export default buildStyle()
