import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, StatusBar, View, Linking } from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui';
import Container from '../../../components/Container.js'
import MyIcon from '../../../components/MyIcon.js'
import CompanyCard from '../../../components/CompanyCard.js'
import Nav from '../CustomerNav.js'

class ContactMe extends React.Component {
  state = { company: null }
  static navigationOptions = {
    title: 'Contact Me',
  }

  render() {
    const { headingStyle } = styles
    let company = this.props.navigation.getParam('company')
    let menuItems = [
        { iconKey: 'chat', text: 'Text me',             onPress: () => { Linking.openURL("sms:" + company.phone) }},
        { iconKey: 'email', text: 'Email me',           onPress: () => { Linking.openURL("mailto:" + company.email) }},
        { iconKey: 'phoneCall', text: 'Call me',        onPress: () => { Linking.openURL("tel:" + company.phone) }}
    ]

    if (company.facebookUrl != null) {
        menuItems.push({ iconKey: 'facebook', text: 'Facebook', onPress: () => { Linking.openURL(company.facebookUrl) }})
    }
    if (company.twitterUrl != null) {
        menuItems.push({ iconKey: 'twitter', text: 'Twitter', onPress: () => { Linking.openURL(company.twitterUrl) }})
    }

    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => this.props.navigation.navigate('CompanyMenu', {company: company}) }
                centerElement="Contact Me"
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

export default connect(mapStateToProps)(ContactMe)
