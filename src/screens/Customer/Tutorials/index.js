import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, StatusBar, View } from 'react-native'
import { Card, Toolbar, ListItem } from 'react-native-material-ui'
import Container from '../../../components/Container.js'
import TutorialList from '../../../components/TutorialList.js'
import Nav from '../CustomerNav.js'
import { fetchTutorials } from '../../../actions/tutorialActions'

class Tutorials extends React.Component {
  static navigationOptions = {
    title: 'Tutorials',
  }

  render() {
    const { headingStyle } = styles
    let company = this.props.navigation.getParam('company')
    let tutorials = Object.entries(this.props.tutorials[company.label])
    Tutorials.navigationOptions.title = company.label + ' Tutorials'

    let categories = []
    for (index in tutorials) {
        let category = tutorials[index]
        categories.push(<TutorialList key={index} title={category[0]} company={company} tutorials={category[1]} />)
    }

    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => this.props.navigation.navigate('CompanyMenu', { company: company })}
                centerElement={company.label + ' Tutorials'}
              />
            <View style={{ flex: 1 }}>
                {categories}    
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
