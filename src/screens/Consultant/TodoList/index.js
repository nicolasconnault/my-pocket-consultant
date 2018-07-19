import React from 'react'
import {
  Text, StatusBar, View, ScrollView,
} from 'react-native'
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui'

import { MyIcon, Container } from '../../../components'
import Nav from '../ConsultantNav'
import styles from '../../styles'

export default class TodoList extends React.Component {
  state = { menuVisible: false };

  static navigationOptions = {
    title: 'To-do List',
    drawerLabel: 'To-do List',
    drawerIcon: <MyIcon iconKey="list" appMode="consultant" />,
  };

  render() {
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.toggleDrawer()}
          centerElement="To-do List"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    To-do List here
          </Text>
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}
