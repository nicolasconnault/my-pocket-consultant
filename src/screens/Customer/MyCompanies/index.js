import React from 'react'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import Container from '../../../components/Container'
import CompanyList from '../../../components/CompanyList'
import Nav from '../CustomerNav'
import MyIcon from '../../../components/MyIcon'

export default class MyCompanies extends React.Component {
  static navigationOptions = {
    title: 'My Companies',
    drawerLabel: 'My Companies',
    drawerIcon: <MyIcon iconKey="subscriptions" />,
  }

  render() {
    const { navigation } = this.props
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
          <CompanyList
            title="These are your companies"
            navigation={navigation}
            listType="customerCompanies"
          />
        </View>
        <Nav activeKey="companies" />
      </Container>
    )
  }
}
