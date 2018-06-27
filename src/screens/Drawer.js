import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Image } from 'react-native'
import { COLOR, Avatar } from 'react-native-material-ui'
import { DrawerItems, SafeAreaView } from 'react-navigation'

import { CONSULTANT_MODE_COLOR, CUSTOMER_MODE_COLOR } from '../config'
import SwitchAppModeButton from '../components/SwitchAppModeButton'
import UserAvatar from '../components/UserAvatar'
import { AppModePropType, UserPropType } from '../proptypes'

class Drawer extends React.Component {
  render() {
    const props = this.props
    const { appMode, user } = this.props

    const newAppMode = (appMode === 'customer') ? 'consultant' : 'customer'
    const styles = {
      headerStyle: {
        backgroundColor: (appMode === 'consultant') ? CONSULTANT_MODE_COLOR : CUSTOMER_MODE_COLOR,
        padding: 0,
        top: 0,
      },
      listStyle: {
        backgroundColor: COLOR.grey300,
      },
      containerStyle: {
        backgroundColor: COLOR.grey300,
        flex: 1,
        padding: 0,
      },
      avatarStyle: {
        height: 30,
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
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={avatarStyle}>
            <UserAvatar userId={user.id} />
          </View>
          <View style={headerStyle}>
            <SwitchAppModeButton newAppMode={newAppMode} />
          </View>
          <View style={listStyle}>
            <DrawerItems {...props} />
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

Drawer.propTypes = {
  appMode: AppModePropType,
  user: UserPropType,
}
Drawer.defaultProps = {
  appMode: 'customer',
  user: null,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Drawer)
