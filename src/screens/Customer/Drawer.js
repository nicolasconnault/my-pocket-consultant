import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { COLOR } from 'react-native-material-ui'
import { DrawerItems, SafeAreaView } from 'react-navigation'

import { CUSTOMER_MODE_COLOR } from '../../config'
import { SwitchAppModeButton } from '../../components'

const styles = {
  headerStyle: {
    backgroundColor: CUSTOMER_MODE_COLOR,
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
}

class Drawer extends React.Component {
  render() {
    const {
      containerStyle,
      headerStyle,
      listStyle,
    } = styles

    const props = this.props
    return (
      <ScrollView style={containerStyle}>
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={headerStyle}>
            <SwitchAppModeButton newAppMode="Consultant" />
          </View>
          <View style={listStyle}>
            <DrawerItems {...props} />
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default connect()(Drawer)
