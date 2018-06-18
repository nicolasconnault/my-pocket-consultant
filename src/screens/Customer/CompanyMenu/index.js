import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, StatusBar, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import Container from '../../../components/Container.js';
import CompanyCard from '../../../components/CompanyCard.js';
import Nav from '../CustomerNav.js';

class CompanyMenu extends React.Component {
  state = { company: null };
  static navigationOptions = {
    title: 'Company Menu',
  };

  render() {
    const { headingStyle } = styles;
    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement="Company Menu"
              />
            <View style={{ flex: 1 }}>
                 <FlatList
                    data={[this.props.navigation.getParam('company')]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CompanyCard company={item} listType="singleCard" />
                    )}
                  />
                <Text>Test!</Text>
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

const mapStateToProps = state => {
  return { 
    companies: state.companies,
  };
};

export default connect(mapStateToProps)(CompanyMenu)
