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

  constructor(props) {
    super(props)
    this.state = {
      filteredSubscriptions: [],
    }

    this.unfilteredSubscriptions = []
  }

  componentWillMount() {
    const { subscriptions } = this.props
    this.unfilteredSubscriptions = subscriptions
    this.setState({ filteredSubscriptions: subscriptions })
  }

  filterList = (search) => {
    const filteredList = []
    const regexp = new RegExp(search)
    this.unfilteredSubscriptions.forEach((subscription) => {
      const filteredCustomers = []
      subscription.customers.forEach((customer) => {
        if (customer.name.match(regexp)) {
          filteredCustomers.push(customer)
        }
        filteredList.push({ ...subscription, customers: filteredCustomers })
      })
    })
    this.setState({ filteredSubscriptions: filteredList })
  }

  render() {
    const screens = {}

    const { navigation } = this.props
    const { filteredSubscriptions } = this.state
    let selectedSubscription = navigation.getParam('subscription')

    filteredSubscriptions.forEach((subscription) => {
      if (selectedSubscription === undefined) {
        selectedSubscription = subscription
      }
      // For each company's category, create a new tab screen with that category's companies
      screens[subscription.companyName] = {
        screen: () => (
          <CustomersTab
            subscription={subscription}
            topNavigation={navigation}
            customers={subscription.customers}
          />
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
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Customers"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: this.filterList,
          }}
        />
        <View style={{ flex: 1 }}>
          { filteredSubscriptions.length > 1 && (
            <TabNavigation />
          )}
          { filteredSubscriptions.length === 1 && (
            <CustomersTab customers={filteredSubscriptions[0].customers} />
          )}
        </View>
        <Nav activeKey="customers" />
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
