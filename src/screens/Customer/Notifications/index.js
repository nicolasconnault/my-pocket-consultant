import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';

import Container from '../../../components/Container.js';
import Nav from '../CustomerNav.js';

export default class Notifications extends React.Component {
  state = { menuVisible: false };
  static navigationOptions = {
    title: 'Notifications',
    drawerLabel: 'Notifications'
  };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
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
            <Nav />
        </Container>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10
  }
};
