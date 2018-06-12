import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';
import uiTheme from '../../../uitheme.js';
import Menu from '../../../menu.js';
import Container from '../../../components/Container.js';
import Nav from '../../../bottom_navigation.js';

export default class Settings extends React.Component {
  state = { menuVisible: false };
  static navigationOptions = {
    title: 'Settings',
    drawerLabel: 'Settings'
  };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement="Settings"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
                }}
            />
            <View style={{ flex: 1 }}>
                <Text style={headingStyle}>
                    Settings here
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
