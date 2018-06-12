import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';
import uiTheme from '../../../uitheme.js';
import Menu from '../../../menu.js';
import Container from '../../../components/Container.js';
import Nav from '../../../bottom_navigation.js';

export default class Help extends React.Component {
  state = { menuVisible: false };
  static navigationOptions = {
    title: 'Help & Feedback',
    drawerLabel: 'Help & Feedback'
  };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement="Help & Feedback"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
                }}
            />
            <View style={{ flex: 1 }}>
                <Text style={headingStyle}>
                    Help here
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
