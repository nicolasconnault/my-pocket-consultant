import React from 'react'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { MyIcon, Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

export default class Notifications extends React.Component {
  static navigationOptions = {
    title: 'News',
    drawerLabel: 'News',
    drawerIcon: <MyIcon iconKey="news" appMode="consultant" />,
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
        <Nav activeKey="news" />
      </Container>
    )
  }
}
