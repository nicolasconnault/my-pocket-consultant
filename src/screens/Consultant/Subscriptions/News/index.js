import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { MyIcon, Container } from '../../../../components'
import { SubscriptionListPropType } from '../../../../proptypes'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'
import SubscriptionNewsTab from './Tab'

class SubscriptionNews extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('selectedSubscription')} News`,
    drawerLabel: 'News',
    drawerIcon: <MyIcon iconKey="news" appMode="consultant" />,
  })

  render() {
    const screens = {}
    const { subscriptions, navigation } = this.props

    const selectedSubscription = navigation.getParam('subscription')

    subscriptions.forEach((subscription) => {
      // For each company's category, create a new tab screen with that category's companies
      screens[subscription.companyName] = {
        screen: () => (
          <SubscriptionNewsTab subscription={subscription} topNavigation={navigation} />
        ),
      }
    })
    const TabNavigation = createMaterialTopTabNavigator(screens, {
      initialRouteName: selectedSubscription.companyName,
      headerMode: 'none',
      tabBarOptions: styles.tabBarOptions,
    })

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Subscription Menu"
        />
        <View style={{ flex: 1 }}>
          { subscriptions.length > 1 && (
            <TabNavigation />
          )}
          { subscriptions.length === 1 && (
            <SubscriptionNewsTab subscription={selectedSubscription} />
          )}
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}

SubscriptionNews.propTypes = {
  subscriptions: SubscriptionListPropType,
}

SubscriptionNews.defaultProps = {
  subscriptions: [],
}
const mapStateToProps = state => ({
  subscriptions: state.subscriptions,
})

export default connect(mapStateToProps)(SubscriptionNews)
