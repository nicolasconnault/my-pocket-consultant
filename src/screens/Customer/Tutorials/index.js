import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import Container from '../../../components/Container'
import TutorialList from '../../../components/TutorialList'
import Nav from '../CustomerNav'
import { TutorialListPropType } from '../../../proptypes'
import MyIcon from '../../../components/MyIcon'

class Tutorials extends React.Component {
  static navigationOptions = {
    title: 'Tutorials',
    drawerIcon: <MyIcon iconKey="school" />,
  }

  render() {
    const { navigation, tutorials } = this.props
    const company = navigation.getParam('company')
    const myTutorials = Object.entries(tutorials[company.label])
    Tutorials.navigationOptions.title = `${company.label} Tutorials`

    const categories = []
    myTutorials.forEach((category, index) => {
      categories.push(
        <TutorialList key={index} title={category[0]} company={company} tutorials={category[1]} />,
      )
    })

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.navigate('CompanyMenu', { company })}
          centerElement={`${company.label} Tutorials`}
        />
        <View style={{ flex: 1 }}>
          {categories}
        </View>
        <Nav activeKey="companies" />
      </Container>
    )
  }
}
Tutorials.propTypes = {
  tutorials: TutorialListPropType,
}
Tutorials.defaultProps = {
  tutorials: [],
}
const mapStateToProps = state => ({
  tutorials: state.tutorials,
})

export default connect(mapStateToProps)(Tutorials)
