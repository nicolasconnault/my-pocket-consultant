import React from 'react';
import { Text, StatusBar, View, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader } from 'react-native-material-ui';
import uiTheme from '../../uitheme.js';
import Menu from '../../menu.js';
import Container from '../../components/Container.js';
import CompanyList from '../../components/CompanyList.js';

export default class MyCompanies extends React.Component {
  state = { menuVisible: false };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
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
                <CompanyList mode="companyList" navigation={this.props.navigation} />
            </View>
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
