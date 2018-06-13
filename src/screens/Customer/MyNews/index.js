import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';
import uiTheme from '../../../uitheme.js';

import Container from '../../../components/Container.js';
import Nav from '../CustomerNav.js';

export default class MyNews extends React.Component {
  state = { menuVisible: false };
  static navigationOptions = {
    title: 'News',
    drawerLabel: 'News'
  };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement="News"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
                }}
            />
            <View style={{ flex: 1 }}>
                <Text style={headingStyle}>
                    News here
                </Text>
            </View>
            <Nav activeKey="news" />
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
