import React from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, Subheader } from 'react-native-material-ui';
import Nav from './bottom_navigation.js';
import uiTheme from './uitheme.js';
import Menu from './menu.js';
import Container from './components/Container.js';
import CompanyList from './components/CompanyList.js';

export default class Main extends React.Component {
  state = { menuVisible: false };

  render() {
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                centerElement="My Subscriptions"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
                }}
            />
            <View style={{ flex: 1 }}>
                <CompanyList />
            </View>
            <Nav />
        </Container>
    );
  }
}
