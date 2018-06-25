import { SELECT_APP_MODE } from './constants'

export default function changeAppMode(newMode) {
  return {
    type: SELECT_APP_MODE,
    mode: newMode,
  }
}
