import React from 'react'
import { connect } from 'react-redux'
import { COLOR } from 'react-native-material-ui'

import {
  Button, View, ScrollView,
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'

import { CUSTOMER_MODE_COLOR } from '../../config'
import changeAppMode from '../../actions/appModeActions'

const styles = {
  headerStyle: {
    backgroundColor: CUSTOMER_MODE_COLOR,
    padding: 0,
    top: 0,
  },
  switchStyle: {
    alignSelf: 'flex-end',
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
  switchToConsultant() {
    const { dispatch } = this.props
    dispatch(changeAppMode('consultant'))
  }

  render() {
    const {
      containerStyle,
      switchStyle,
      headerStyle,
      listStyle,
    } = styles

    const props = this.props
    return (
      <ScrollView style={containerStyle}>
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={headerStyle}>
            <View style={switchStyle}>
              <Button onPress={() => this.switchToConsultant()} title="Switch to Consultant" />
            </View>
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
