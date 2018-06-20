import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, StatusBar, View, Linking } from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui';
import Container from '../../../components/Container.js'
import MyIcon from '../../../components/MyIcon.js'
import CompanyCard from '../../../components/CompanyCard.js'
import Nav from '../CustomerNav.js'

class CompanyMenu extends React.Component {
  state = { company: null }
  static navigationOptions = {
    title: 'Company Menu',
  }

  render() {
    const { headingStyle } = styles
    let company = this.props.navigation.getParam('company')
    let menuItems = [
        { iconKey: 'home', text: 'Home Page', onPress: () => { Linking.openURL(company.websiteUrl) }},
        { iconKey: 'cart', text: 'Shop', onPress: () => { Linking.openURL(company.homeUrl) }},
        { iconKey: 'news', text: 'News', onPress: () => { this.props.navigation.navigate('CompanyNews', { company: company }) }},
        { iconKey: 'phoneCall', text: 'Contact me', onPress: () => { this.props.navigation.navigate('ContactMe', { company: company }) }},
        { iconKey: 'parcel', text: 'Request a sample', onPress: null },
        { iconKey: 'people', text: 'Host a demo', onPress: null },
        { iconKey: 'school', text: 'Tutorials', onPress: () => { this.props.navigation.navigate('Tutorials', { company: company }) }},
    ]

    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => this.props.navigation.navigate('MyConsultants') }
                centerElement="Company Menu"
              />
            <View style={{ flex: 1 }}>
                 <FlatList
                    data={[company]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CompanyCard company={item} listType="singleCard" />
                    )}
                  />
                 <FlatList
                    data={menuItems}
                    keyExtractor={item => item.iconKey}
                    renderItem={({ item }) => (
                        <ListItem
                            leftElement={<MyIcon iconKey={item.iconKey} />}
                            onLeftElementPress={() => item.onPress() }
                            centerElement={<View onPress={item.onPress}><Text>{item.text}</Text></View>}
                            onPress={() => item.onPress() }
                        />
                    )}
                  />
            </View>
            <Nav activeKey="companies" />
        </Container>
    )
  }
}

const styles = {
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10
  }
}

const mapStateToProps = state => {
  return { 
    companies: state.companies,
  }
}

export default connect(mapStateToProps)(CompanyMenu)
