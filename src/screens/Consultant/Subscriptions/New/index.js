import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar, View,
} from 'react-native'
import { Toolbar, Snackbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { CONSULTANT_MODE_SECONDARY_COLOR } from '../../../../config'
import { Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'
import NewSubscriptionTab from './Tab'

class NewSubscription extends React.Component {
  static navigationOptions = {
    title: 'New Subscription',
  }

  constructor(props) {
    super(props)
    this.state = {
      isSnackBarVisible: false,
      snackBarMessage: '',
    }

    this.subscriptionDeletedSuccessCallback = this.subscriptionDeletedSuccessCallback.bind(this)
    this.subscriptionSaveSuccessCallback = this.subscriptionSaveSuccessCallback.bind(this)
    this.subscriptionCreateSuccessCallback = this.subscriptionCreateSuccessCallback.bind(this)
  }

  subscriptionDeletedSuccessCallback() {
    this.setState({ isSnackBarVisible: true, snackBarMessage: 'Subscription Canceled!' })
  }

  subscriptionSaveSuccessCallback() {
    this.setState({ isSnackBarVisible: true, snackBarMessage: 'Subscription Updated!' })
  }

  subscriptionCreateSuccessCallback() {
    this.setState({ isSnackBarVisible: true, snackBarMessage: 'Subscription Created!' })
  }

  render() {
    const { navigation, categoryCompanies, subscriptions } = this.props
    const {
      isSnackBarVisible,
      snackBarMessage,
    } = this.state
    const screens = {}

    Object.keys(categoryCompanies).forEach((categoryName) => {
      // Skip any company that is already subscribed
      const companies = []
      categoryCompanies[categoryName].forEach((company) => {
        let foundCompany = false

        subscriptions.forEach((subscription) => {
          if (subscription.companyName === company.name) {
            foundCompany = true
          }
        })
        if (!foundCompany) {
          companies.push(company)
        }
      })

      // For each company's category, create a new tab screen with that category's companies
      if (companies.length > 0) {
        screens[categoryName] = {
          screen: () => (
            <NewSubscriptionTab
              categoryName={categoryName}
              companies={companies}
              topNavigation={navigation}
              deleteCallback={this.subscriptionDeletedSuccessCallback}
              createCallback={this.subscriptionCreateSuccessCallback}
            />
          ),
        }
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
        <Snackbar
          style={{ container: styles.snackBar.container, content: styles.snackBar.message }}
          visible={isSnackBarVisible}
          message={snackBarMessage}
          onRequestClose={() => this.setState({ isSnackBarVisible: false })}
        />
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    categoryCompanies: state.categoryCompanies,
    subscriptions: state.subscriptions,
  }
}

export default connect(mapStateToProps)(NewSubscription)
