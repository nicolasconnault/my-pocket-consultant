import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { MyIcon, Container } from '../../../components'
import styles from '../../styles'
import Nav from '../ConsultantNav'
import CustomersTab from './Tab'
import { SubscriptionListPropType } from '../../../proptypes'

class Customers extends React.Component {
  static navigationOptions = {
    title: 'Customers',
    drawerLabel: 'Customers',
    drawerIcon: <MyIcon iconKey="people" appMode="consultant" />,
  }

  render() {
    const screens = {}

    const { subscriptions, navigation } = this.props
    const selectedSubscription = navigation.getParam('subscription')
    subscriptions.forEach((subscription) => {
      // For each company's category, create a new tab screen with that category's companies
      screens[subscription.companyName] = {
        screen: () => (<CustomersTab subscription={subscription} />),
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
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Customers"
        />
        <View style={{ flex: 1 }}>
          { subscriptions.length > 1 && (
            <TabNavigation />
          )}
          { subscriptions.length === 1 && (
            <CustomersTab subscription={selectedSubscription} />
          )}
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}

Customers.propTypes = {
  subscriptions: SubscriptionListPropType,
}
Customers.defaultProps = {
  subscriptions: [],
}
const mapStateToProps = state => ({
  subscriptions: state.subscriptions,
})

export default connect(mapStateToProps)(Customers)
