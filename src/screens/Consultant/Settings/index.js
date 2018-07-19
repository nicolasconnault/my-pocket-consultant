import React from 'react'
import {
  Text, StatusBar, View, ScrollView,
} from 'react-native'
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui'

import { MyIcon, Container } from '../../../components'
import Nav from '../ConsultantNav'
import styles from '../../styles'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    drawerLabel: 'Settings',
    drawerIcon: <MyIcon iconKey="settings" appMode="consultant" />,
  };

  render() {
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.toggleDrawer()}
          centerElement="Settings"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Settings here
          </Text>
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}
