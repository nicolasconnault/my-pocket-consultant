import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import Container from '../../../components/Container'
import Nav from '../CustomerNav'
import TutorialStep from '../../../components/TutorialStep'

class Tutorial extends React.Component {
  static navigationOptions = {
    title: 'Tutorials',
  }

  render() {
    const { headingStyle } = styles
    let company = this.props.navigation.getParam('company')
    let tutorial = this.props.navigation.getParam('tutorial')
    Tutorial.navigationOptions.title = company.label + ' Tutorials'

    // Add counter to steps here, just in case they're mis-numbered in the backend
    let counter = 1
    for (index in tutorial.steps) {
        tutorial.steps[index].number = counter
        counter += 1
    }

    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => this.props.navigation.navigate('Tutorials', { company: company })}
                centerElement={company.label + ' Tutorials'}
              />
            <View style={{ flex: 1 }}>
                <Text style={headingStyle}>{tutorial.title}</Text>
                <FlatList
                    data={tutorial.steps}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => ( <TutorialStep step={item} />)}
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
  },
}

export default Tutorial
