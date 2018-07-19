import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { COLOR } from 'react-native-material-ui'
import { DrawerItems } from 'react-navigation'

import { CONSULTANT_MODE_COLOR, CUSTOMER_MODE_COLOR } from '../config'
import { SwitchAppModeButton, UserAvatar } from '../components'
import { AppModePropType, UserPropType, DeviceSizePropType } from '../proptypes'

class Drawer extends React.Component {
  render() {
    const props = this.props
    const { appMode, user } = this.props

    const newAppMode = (appMode === 'customer') ? 'consultant' : 'customer'
    const styles = {
      containerStyle: {
        backgroundColor: COLOR.grey300,
        flex: 1,
        padding: 0,
      },
      headerStyle: {
        backgroundColor: (appMode === 'consultant') ? CONSULTANT_MODE_COLOR : CUSTOMER_MODE_COLOR,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1,
      },
      listStyle: {
        backgroundColor: COLOR.grey300,
      },
      avatarStyle: {
        height: 60,
      },
    }

    const {
      containerStyle,
      headerStyle,
      listStyle,
      avatarStyle,
    } = styles

    return (
      <ScrollView style={containerStyle}>
        <View style={headerStyle}>
          <View style={avatarStyle}>
            <UserAvatar userId={user.id} />
          </View>
          <View>
            <SwitchAppModeButton newAppMode={newAppMode} />
          </View>
        </View>

        <View style={listStyle}>
          <DrawerItems {...props} />
        </View>
      </ScrollView>
    )
  }
}

Drawer.propTypes = {
  appMode: AppModePropType,
  user: UserPropType,
  deviceSize: DeviceSizePropType,
}
Drawer.defaultProps = {
  appMode: 'customer',
  user: null,
  deviceSize: 'medium',
}

const mapStateToProps = state => ({
  user: state.user,
  deviceSize: state.deviceSize,
})

export default connect(mapStateToProps)(Drawer)
