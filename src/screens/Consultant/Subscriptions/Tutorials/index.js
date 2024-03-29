import React from 'react'
import {
  Text, StatusBar, View, ScrollView,
} from 'react-native'
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui'

import { Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

export default class Notifications extends React.Component {
  state = { menuVisible: false };

  static navigationOptions = {
    title: 'Notifications',
    drawerLabel: 'Notifications',
  };

  render() {
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.toggleDrawer()}
          centerElement="Notifications"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Notifications here
          </Text>
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}
