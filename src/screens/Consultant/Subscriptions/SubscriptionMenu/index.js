import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { Container } from '../../../../components'
import styles from '../../../styles'
import Nav from '../../ConsultantNav'
import SubscriptionMenuTab from './Tab'
import { SubscriptionListPropType } from '../../../../proptypes'

class SubscriptionMenu extends React.Component {
  static navigationOptions = {
    title: 'Company Menu',
  }

  render() {
    const screens = {}

    const { subscriptions, navigation } = this.props
    const selectedSubscription = navigation.getParam('selectedSubscription')
    subscriptions.forEach((subscription) => {
      // For each company's category, create a new tab screen with that category's companies
      screens[subscription.companyName] = {
        screen: () => (<SubscriptionMenuTab subscription={subscription} />),
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
            <SubscriptionMenuTab subscription={selectedSubscription} />
          )}
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}
SubscriptionMenu.propTypes = {
  subscriptions: SubscriptionListPropType,
}

SubscriptionMenu.defaultProps = {
  subscriptions: [],
}
const mapStateToProps = state => ({
  subscriptions: state.subscriptions,
})

export default connect(mapStateToProps)(SubscriptionMenu)
