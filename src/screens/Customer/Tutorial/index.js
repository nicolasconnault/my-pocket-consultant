import React from 'react'
import {
  FlatList, Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { Container, TutorialStep } from '../../../components'
import styles from '../../styles'

class Tutorial extends React.Component {
  static navigationOptions = {
    title: 'Tutorials',
  }

  render() {
    const { headingStyle } = styles
    const { navigation } = this.props
    const company = navigation.getParam('company')
    const tutorial = navigation.getParam('tutorial')
    Tutorial.navigationOptions.title = `${company.label} Tutorials`

    // Add counter to steps here, just in case they're mis-numbered in the backend
    let counter = 1
    tutorial.steps.forEach((step, index) => {
      tutorial.steps[index].number = counter
      counter += 1
    })

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.navigate('Tutorials', { company })}
          centerElement={`${company.label} Tutorials`}
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
            {tutorial.title}
          </Text>
          <FlatList
            data={tutorial.steps}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (<TutorialStep step={item} />)}
          />
        </View>
        
      </Container>
    )
  }
}


export default Tutorial
