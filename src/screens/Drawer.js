import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text } from 'react-native'
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
        container: {
          backgroundColor: (appMode === 'consultant') ? CONSULTANT_MODE_COLOR : CUSTOMER_MODE_COLOR,
          flex: 1,
        },
        top: {
          container: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          },
          switchButton: {
            paddingRight: 10,
          },
          avatar: {
            height: 60,
            padding: 20,
          },
        },
        bottom: {
          container: {
            padding: 20,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          },
          username: {
            color: '#FFFFFF',
            fontWeight: 'bold',
          },
          email: {
            color: '#DDDDDD',
            fontWeight: '300',
            fontSize: 11,
          },
        },
      },
      listStyle: {
        backgroundColor: COLOR.grey300,
      },
    }

    const {
      containerStyle,
      headerStyle,
      listStyle,
    } = styles

    return (
      <ScrollView style={containerStyle}>
        <View style={headerStyle.container}>
          <View style={headerStyle.top.container}>
            <View style={headerStyle.top.avatar}>
              <UserAvatar userId={user.id} />
            </View>

            <View style={headerStyle.top.switchButton}>
              <SwitchAppModeButton newAppMode={newAppMode} />
            </View>
          </View>

          <View style={headerStyle.bottom.container}>
            <Text style={headerStyle.bottom.username}>{user.firstName} {user.lastName}</Text>
            <Text style={headerStyle.bottom.email}>{user.username}</Text>
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
