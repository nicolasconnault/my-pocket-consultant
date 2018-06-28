import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList, Text, StatusBar, View, Linking,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Container from '../../../components/Container'
import MyIcon from '../../../components/MyIcon'
import CompanyCard from '../../../components/CompanyCard'
import Nav from '../CustomerNav'
import { TutorialListPropType } from '../../../proptypes'

class CompanyMenu extends React.Component {
  static navigationOptions = {
    title: 'Company Menu',
  }

  render() {
    const { navigation, tutorials } = this.props
    const company = navigation.getParam('company')
    const menuItems = [
      {
        iconKey: 'home',
        text: 'Home Page',
        onPress: () => {
          Linking.openURL(company.websiteUrl)
        },
      },
      {
        iconKey: 'cart',
        text: 'Shop',
        onPress: () => {
          Linking.openURL(company.homeUrl)
        },
      },
      {
        iconKey: 'news',
        text: 'News',
        onPress: () => {
          navigation.navigate('CompanyNews', { company })
        },
      },
      {
        iconKey: 'phoneCall',
        text: 'Contact me',
        onPress: () => {
          navigation.navigate('ContactMe', { company })
        },
      },
      { iconKey: 'parcel', text: 'Request a sample', onPress: null },
      { iconKey: 'people', text: 'Host a demo', onPress: null },
    ]

    if (Object.entries(tutorials[company.label]).length > 0) {
      menuItems.push({
        iconKey: 'school',
        text: 'Tutorials',
        onPress: () => {
          navigation.navigate('Tutorials', { company })
        },
      })
    }

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.navigate('MyConsultants')}
          centerElement="Company Menu"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={[company]}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CompanyCard company={item} listType="singleCard" />}
          />
          <FlatList
            style={{ alignSelf: 'flex-start' }}
            data={menuItems}
            keyExtractor={item => item.iconKey}
            renderItem={({ item }) => (
              <ListItem
                leftElement={<MyIcon iconKey={item.iconKey} />}
                onLeftElementPress={() => item.onPress()}
                centerElement={(
                  <View onPress={item.onPress}>
                    <Text>
                      {item.text}
                    </Text>
                  </View>
)}
                onPress={() => item.onPress()}
              />
            )}
          />
        </View>
        <Nav activeKey="companies" />
      </Container>
    )
  }
}
CompanyMenu.propTypes = {
  tutorials: TutorialListPropType,
}
CompanyMenu.defaultProps = {
  tutorials: [],
}
const mapStateToProps = state => ({
  companies: state.companies,
  tutorials: state.tutorials,
})

export default connect(mapStateToProps)(CompanyMenu)
