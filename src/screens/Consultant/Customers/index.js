import React from 'react'
import {
  Text, StatusBar, View, ScrollView,
} from 'react-native'
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui'

import Nav from '../ConsultantNav'
import { MyIcon, Container } from '../../../components'
import styles from '../../styles'

export default class Customers extends React.Component {
  state = { menuVisible: false };

  static navigationOptions = {
    title: 'Customers',
    drawerLabel: 'Customers',
    drawerIcon: <MyIcon iconKey="people" appMode="consultant" />,
  };

  render() {
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.toggleDrawer()}
          centerElement="Customers"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Customers here
          </Text>
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}
