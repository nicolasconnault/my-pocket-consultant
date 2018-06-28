import React from 'react'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import Container from '../../../components/Container'
import CompanyList from '../../../components/CompanyList'
import Nav from '../CustomerNav'
import MyIcon from '../../../components/MyIcon'

export default class MyConsultants extends React.Component {
  static navigationOptions = {
    title: 'My Consultants',
    drawerLabel: 'My Consultants',
    drawerIcon: <MyIcon iconKey="people" />,
  };

  render() {
    const { navigation } = this.props
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
          <CompanyList
            title="Set a consultant for each company"
            navigation={navigation}
            listType="withConsultants"
          />
        </View>
        <Nav activeKey="consultants" />
      </Container>
    )
  }
}
