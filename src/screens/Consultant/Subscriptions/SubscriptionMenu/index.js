import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar, Snackbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { Container } from '../../../../components'
import styles from '../../../styles'
import Nav from '../../ConsultantNav'
import SubscriptionMenuTab from './Tab'
import { SubscriptionListPropType } from '../../../../proptypes'

class SubscriptionMenu extends React.Component {
  static navigationOptions = {
    title: 'Subscription Menu',
  }

  constructor(props) {
    super(props)
    this.state = {
      isSnackBarVisible: false,
      snackBarMessage: '',
      snackBarActionText: '',
      snackBarOnActionPress: null,
    }
    this.clickedEmptyCustomerListCallback = this.clickedEmptyCustomerListCallback.bind(this)
    this.deactivateSubscriptionCallback = this.deactivateSubscriptionCallback.bind(this)
  }

  clickedEmptyCustomerListCallback() {
    this.setState({
      isSnackBarVisible: true,
      snackBarMessage: 'Activate this subscription to appear in customer search',
      snackBarActionText: 'Activate',
      snackBarOnActionPress: this.activateSubscriptionCallback,
    })
  }

  deactivateSubscriptionCallback() {
    this.setState({
      isSnackBarVisible: true,
      snackBarMessage: 'Subscription deactivated, will no longer appear in customer search',
      snackBarActionText: '',
      snackBarOnActionPress: null,
    })
  }

  activateSubscriptionCallback() {
    this.state = {
      isSnackBarVisible: false,
      snackBarMessage: '',
      snackBarActionText: '',
      snackBarOnActionPress: null,
    }
    const { navigation } = this.props
    const selectedSubscription = navigation.getParam('selectedSubscription')
    navigation.navigate('ActivateSubscription', { subscription: selectedSubscription })
  }

  render() {
    const screens = {}

    const { subscriptions, navigation } = this.props
    const {
      isSnackBarVisible,
      snackBarMessage,
      snackBarOnActionPress,
      snackBarActionText,
    } = this.state
    const selectedSubscription = navigation.getParam('selectedSubscription')
    subscriptions.forEach((subscription) => {
      // For each company's category, create a new tab screen with that category's companies
      screens[subscription.companyName] = {
        screen: () => (
          <SubscriptionMenuTab
            subscription={subscription}
            topNavigation={navigation}
            emptyCustomerListCallback={this.clickedEmptyCustomerListCallback}
            deactivateSubscriptionCallback={this.deactivateSubscriptionCallback}
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
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Subscription Menu"
        />
        <View style={{ flex: 1 }}>
          { subscriptions.length > 1 && (
            <TabNavigation />
          )}
          { subscriptions.length === 1 && (
            <SubscriptionMenuTab
              subscription={selectedSubscription}
              topNavigation={navigation}
              emptyCustomerListCallback={this.clickedEmptyCustomerListCallback}
            />
          )}
        </View>
        <Snackbar
          style={{ container: styles.snackBar.container, content: styles.snackBar.content }}
          visible={isSnackBarVisible}
          message={snackBarMessage}
          onRequestClose={() => this.setState({ isSnackBarVisible: false })}
          timeout={8000}
          onActionPress={snackBarOnActionPress}
          actionText={snackBarActionText}
          button={{ style: { text: { color: '#FFFFFF' } } }}
        />
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
