import { Platform } from 'react-native'

export default {
  buttonStyle: {
    fontSize: 14,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleStyle: {
    fontSize: 14,
  },
  logoContainerStyle: {
    padding: 20,
    alignSelf: 'flex-start',
  },
  logoStyle: {
    width: 41,
    height: 41,
  },
  switchContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 3,
  },
  avatarStyle: {
    padding: 20,
    alignSelf: 'flex-end',
  },
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchStyle: {
    transform: (Platform.OS === 'ios') ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [], // Reduce size of iOS switches slightly
    alignSelf: 'flex-end',
  },
}
