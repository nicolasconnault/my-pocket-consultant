import {
  Dimensions,
} from 'react-native'

import { SET_DEVICE_SIZE } from './constants'


export default function setDeviceSize() {
  const { width, height } = Dimensions.get('window')
  const portraitWidth = (height > width) ? width : height

  let deviceSize = null
  if (portraitWidth <= 320) {
    deviceSize = 'small'
  } else if (portraitWidth > 320 && portraitWidth <= 592) {
    deviceSize = 'medium'
  } else if (portraitWidth > 592 && portraitWidth <= 768) {
    deviceSize = 'large'
  } else {
    deviceSize = 'huge'
  }

  return {
    type: SET_DEVICE_SIZE,
    deviceSize,
  }
}
