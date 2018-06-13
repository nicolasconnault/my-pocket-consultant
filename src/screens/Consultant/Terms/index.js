import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';
import uiTheme from '../../../uitheme.js';

import Container from '../../../components/Container.js';
import Nav from '../ConsultantNav.js';

export default class Terms extends React.Component {
  state = { menuVisible: false };
  static navigationOptions = {
    title: 'Terms',
    drawerLabel: 'Terms'
  };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement="Terms"
            />
            <View style={{ flex: 1 }}>
                <Text style={headingStyle}>
                    Terms here
                </Text>
            </View>
            <Nav activeKey="customers" />
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
