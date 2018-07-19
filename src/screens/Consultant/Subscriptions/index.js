import React from 'react'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { MyIcon, Container } from '../../../components'
import Nav from '../ConsultantNav'
import styles from '../../styles'

export default class Subscriptions extends React.Component {
  static navigationOptions = {
    title: 'Subscriptions',
    drawerLabel: 'Subscriptions',
    drawerIcon: <MyIcon iconKey="subscriptions" appMode="consultant" />,
  };

  render() {
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.toggleDrawer()}
          centerElement="Subscriptions"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Subscriptions here
          </Text>
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}
