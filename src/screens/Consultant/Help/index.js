import React from 'react'
import {
  Text, StatusBar, View, ScrollView,
} from 'react-native'
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui'

import Container from '../../../components/Container'
import Nav from '../ConsultantNav'
import MyIcon from '../../../components/MyIcon'

export default class Help extends React.Component {
  static navigationOptions = {
    title: 'Help',
    drawerLabel: 'Help',
    drawerIcon: <MyIcon iconKey="help" />,
  };

  render() {
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.toggleDrawer()}
          centerElement="Help"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Help here
          </Text>
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}

const styles = {
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
}
