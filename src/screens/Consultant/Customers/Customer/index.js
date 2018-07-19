import React from 'react'
import {
  Text, StatusBar, View, ScrollView,
} from 'react-native'
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui'

import { Container } from '../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

export default class Customer extends React.Component {
  state = { menuVisible: false };

  static navigationOptions = {
    title: 'Customer',
    drawerLabel: 'Customer',
  };

  render() {
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.toggleDrawer()}
          centerElement="Customer"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Customer here
          </Text>
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}
