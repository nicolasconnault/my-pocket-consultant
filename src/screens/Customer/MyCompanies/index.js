import React from 'react';
import { Text, StatusBar, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import Container from '../../../components/Container.js';
import CompanyList from '../../../components/CompanyList.js';
import Nav from '../CustomerNav.js';

export default class MyCompanies extends React.Component {
  state = { menuVisible: false };
  static navigationOptions = {
    title: 'My Companies',
    drawerLabel: 'My Companies'
  };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement="My Companies"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
                }}
            />
            <View style={{ flex: 1 }}>
                <Text style={headingStyle}>
                    These are your companies
                </Text>
                <CompanyList navigation={this.props.navigation} listType="customerCompanies" />
            </View>
            <Nav activeKey="companies" />
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
