import React from 'react'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import Container from '../../../components/Container'
import Nav from '../CustomerNav'
import MyIcon from '../../../components/MyIcon'
import styles from '../../styles'

export default class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
    drawerLabel: 'Notifications',
    drawerIcon: <MyIcon iconKey="notifications" />,
  };

  render() {
    const { navigation } = this.props
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Notifications"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Help here
          </Text>
        </View>
        <Nav />
      </Container>
    )
  }
}
