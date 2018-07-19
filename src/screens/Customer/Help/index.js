import React from 'react'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { MyIcon, Container } from '../../../components'

import styles from '../../styles'

export default class Help extends React.Component {
  static navigationOptions = {
    title: 'Help & Feedback',
    drawerLabel: 'Help & Feedback',
    drawerIcon: <MyIcon iconKey="help" />,
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
          centerElement="Help & Feedback"
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
