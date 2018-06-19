import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, StatusBar, View, Linking } from 'react-native'
import call from 'react-native-phone-call'
import { Toolbar, ListItem } from 'react-native-material-ui';
import Container from '../../../components/Container.js'
import MyIcon from '../../../components/MyIcon.js'
import CompanyCard from '../../../components/CompanyCard.js'
import Nav from '../CustomerNav.js'

class CompanyNews extends React.Component {
  state = { company: null }
  static navigationOptions = {
    title: 'Company News',
  }

  render() {
    const { headingStyle } = styles
    let company = this.props.navigation.getParam('company')
    let menuItems = [
        { iconKey: 'home', text: 'Home Page', onPress: null },
        { iconKey: 'cart', text: 'Shop', onPress: null },
        { iconKey: 'news', text: 'News', onPress: this.props.navigation.navigate('CompanyNews', { company: company }) },
        { iconKey: 'call', text: 'Contact me', onPress: this.props.navigation.navigate('ContactMe', { company: company }) },
        { iconKey: 'parcel', text: 'Request a sample', onPress: null },
        { iconKey: 'people', text: 'Host a demo', onPress: null },
        { iconKey: 'school', text: 'Tutorials', onPress: this.props.navigation.navigate('Tutorials', { company: company }) },
    ]

    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement="Company News"
              />
            <View style={{ flex: 1 }}>
                 <FlatList
                    data={menuItems}
                    keyExtractor={item => item.iconKey}
                    renderItem={({ item }) => (
                        <ListItem
                            leftElement={<MyIcon iconKey={item.iconKey} />}
                            centerElement={<View onPress={item.onPress}><Text>{item.text}</Text></View>}
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

export default connect(mapStateToProps)(CompanyNews)
