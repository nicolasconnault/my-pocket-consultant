import React from 'react'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import Container from '../../../../components/Container'
import Nav from '../../ConsultantNav'
import MyIcon from '../../../../components/MyIcon'
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
