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

export default class MyCompanies extends React.Component {
  static navigationOptions = {
    title: 'My Companies',
    drawerLabel: 'My Companies',
  }

  render() {
    const { navigation } = this.props
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="My Companies"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    These are your companies
          </Text>
          <CompanyList navigation={navigation} listType="customerCompanies" />
        </View>
        <Nav activeKey="companies" />
      </Container>
    )
  }
}
