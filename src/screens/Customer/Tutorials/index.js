import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, StatusBar, View, Linking } from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Container from '../../../components/Container.js'
import MyIcon from '../../../components/MyIcon.js'
import CompanyCard from '../../../components/CompanyCard.js'
import Nav from '../CustomerNav.js'
import { fetchTutorials } from '../../../actions/tutorialActions'

class Tutorials extends React.Component {
  static navigationOptions = {
    title: 'Tutorials',
  }

  render() {
    const { headingStyle } = styles
    let company = this.props.navigation.getParam('company')
    Tutorials.navigationOptions.title = company.label + ' Tutorials'
    console.log(Object.entries(this.props.tutorials[company.label]))

    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.toggleDrawer()}
                centerElement={company.label + ' Tutorials'}
              />
            <View style={{ flex: 1 }}>
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
    tutorials: state.tutorials,
  }
}

export default connect(mapStateToProps)(Tutorials)
