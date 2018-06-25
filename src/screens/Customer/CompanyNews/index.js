import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList, Text, StatusBar, View,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Container from '../../../components/Container'
import MyIcon from '../../../components/MyIcon'
import Nav from '../CustomerNav'

class CompanyNews extends React.Component {
  static navigationOptions = {
    title: 'Company News',
  }

  render() {
    const { navigation } = this.props
    const company = navigation.getParam('company')
    const menuItems = [
      { iconKey: 'home', text: 'Home Page', onPress: null },
      { iconKey: 'cart', text: 'Shop', onPress: null },
      {
        iconKey: 'news',
        text: 'News',
        onPress: navigation.navigate('CompanyNews', { company }),
      },
      {
        iconKey: 'call',
        text: 'Contact me',
        onPress: navigation.navigate('ContactMe', { company }),
      },
      { iconKey: 'parcel', text: 'Request a sample', onPress: null },
      { iconKey: 'people', text: 'Host a demo', onPress: null },
      {
        iconKey: 'school',
        text: 'Tutorials',
        onPress: navigation.navigate('Tutorials', { company }),
      },
    ]

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Company News"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={menuItems}
            keyExtractor={item => item.iconKey}
            renderItem={({ item }) => (
              <ListItem
                leftElement={<MyIcon iconKey={item.iconKey} />}
                centerElement={(
                  <View onPress={item.onPress}>
                    <Text>
                      {item.text}
                    </Text>
                  </View>
)}
              />
            )}
          />
        </View>
        <Nav activeKey="companies" />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default connect(mapStateToProps)(CompanyNews)
