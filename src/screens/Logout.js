import React from 'react'
import { connect } from 'react-redux'
import {
  AsyncStorage,
} from 'react-native'

import { ACCESS_TOKEN } from '../config'
import MyIcon from '../components/MyIcon'
import { AppModePropType } from '../proptypes'

class Logout extends React.Component {
  static navigationOptions = {
    drawerIcon: <MyIcon iconKey="logOut" />,
  }

  componentDidMount() {
    this.loadInitialState().done()
    const { appMode } = this.props
    Logout.navigationOptions.drawerIcon = <MyIcon iconKey="logOut" appMode={appMode} />
  }

  loadInitialState = async () => {
    const { navigation } = this.props
    await AsyncStorage.removeItem(ACCESS_TOKEN)
    navigation.navigate('Login')
  }

  render() {
    return null
  }
}

Logout.propTypes = {
  appMode: AppModePropType,
}
Logout.defaultProps = {
  appMode: 'customer',
}

const mapStateToProps = state => ({
  appMode: state.appMode,
})
export default connect(mapStateToProps)(Logout)
