import React from 'react'
import { Text, StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import Container from '../../../components/Container'
import CompanyList from '../../../components/CompanyList'
import Nav from '../CustomerNav'

const styles = {
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
}

export default class MyConsultants extends React.Component {
  static navigationOptions = {
    title: 'My Consultants',
    drawerLabel: 'My Consultants',
  };

  render() {
    const { navigation } = this.props
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="My Consultants"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Set a consultant for each company
          </Text>
          <CompanyList navigation={navigation} listType="withConsultants" />
        </View>
        <Nav activeKey="consultants" />
      </Container>
    )
  }
}
