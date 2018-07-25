import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { CONSULTANT_MODE_SECONDARY_COLOR } from '../../../../config'
import { Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'
import NewSubscriptionTab from './Tab'

class NewSubscription extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
    drawerLabel: 'Notifications',
  };

  render() {
    const { navigation, categoryCompanies } = this.props

    const screens = {}

    Object.keys(categoryCompanies).forEach((categoryName) => {
      // For each company's category, create a new tab screen with that category's companies
      screens[categoryName] = {
        screen: () => (<NewSubscriptionTab categoryName={categoryName} companies={categoryCompanies[categoryName]} />),
      }
    })
    const TabNavigation = createMaterialTopTabNavigator(screens, {
      initialRouteName: Object.keys(screens)[0],
      headerMode: 'none',
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        indicatorStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabStyle: {
          width: 140,
        },
        style: {
          backgroundColor: CONSULTANT_MODE_SECONDARY_COLOR,
        },
        scrollEnabled: true,
      },
    })

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="New Subscription"
        />
        <View style={{ flex: 1 }}>
          <TabNavigation />
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    categoryCompanies: state.categoryCompanies,
  }
}

export default connect(mapStateToProps)(NewSubscription)
