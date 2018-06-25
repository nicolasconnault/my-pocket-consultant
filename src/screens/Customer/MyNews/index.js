import React from 'react'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import Container from '../../../components/Container'
import Nav from '../CustomerNav'

const styles = {
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
}

export default class MyNews extends React.Component {
  static navigationOptions = {
    title: 'News',
    drawerLabel: 'News',
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
          centerElement="News"
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
