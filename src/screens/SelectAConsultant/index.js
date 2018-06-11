import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';
import Nav from '../../bottom_navigation.js';
import Menu from '../../menu.js';
import Container from '../../components/Container.js';

export default class SelectAConsultant extends React.Component {
  state = { menuVisible: false };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                centerElement="Select a Consultant"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
                }}
            />
            <View style={{ flex: 1 }}>
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
