import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';
import Nav from '../../bottom_navigation.js';
import uiTheme from '../../uitheme.js';
import Menu from '../../menu.js';
import Container from '../../components/Container.js';
import CompanyList from '../../components/CompanyList.js';

export default class MyConsultants extends React.Component {
  state = { menuVisible: false };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                centerElement="My Consultants"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
                }}
            />
            <View style={{ flex: 1 }}>
                <Text style={headingStyle}>
                    Set a consultant for each company
                </Text>
                <CompanyList navigation={this.props.navigation} />
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
