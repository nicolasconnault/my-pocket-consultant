import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  Switch,
  View,
  Linking,
} from 'react-native'

import {
  Toolbar,
  COLOR,
  ListItem,
  Snackbar,
} from 'react-native-material-ui'

import { toggleCustomerRecruit, toggleCustomerHost } from '../../../../actions'
import { Container, MyIcon } from '../../../../components'
import { SubscriptionListPropType } from '../../../../proptypes'
import CallReminderMenu from './CallReminderMenu'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

class Customer extends React.Component {
  static navigationOptions = {
    title: 'Customer',
    drawerLabel: 'Customer',
  }

  constructor(props) {
    super(props)
    this.state = {
      isSnackBarVisible: false,
    }
    this.callReminderSuccessCallback = this.callReminderSuccessCallback.bind(this)
  }

  callReminderSuccessCallback() {
    this.setState({ isSnackBarVisible: true })
  }

  toggleCustomerRecruitCallback(id, oldValue) {
    const {
      dispatch,
    } = this.props
    dispatch(toggleCustomerRecruit(id, oldValue))
  }

  toggleCustomerHostCallback(id, oldValue) {
    const {
      dispatch,
    } = this.props
    dispatch(toggleCustomerHost(id, oldValue))
  }

  render() {
    const { headingStyle, switchStyle } = styles
    const { navigation, subscriptions } = this.props
    const { isSnackBarVisible } = this.state
    const customerId = navigation.getParam('customer').id
    const subscriptionId = navigation.getParam('subscriptionId')
    let customer = null
    subscriptions.forEach((subscription) => {
      if (subscription.id === subscriptionId) {
        subscription.customers.forEach((c) => {
          if (c.id === customerId) {
            customer = c
          }
        })
      }
    })
    const notes = customer.notes

    const menuItems = [
      {
        key: 'item1',
        text: 'Potential Recruit',
        rightElement: (
          <Switch
            onTintColor={COLOR.pink300}
            thumbTintColor={COLOR.grey300}
            style={switchStyle}
            value={customer.potentialRecruit}
            onValueChange={
              () => this.toggleCustomerRecruitCallback(customer.id, customer.potentialRecruit)
            }
          />
        ),
      },
      {
        key: 'item2',
        text: 'Potential Host',
        rightElement: (
          <Switch
            onTintColor={COLOR.pink300}
            thumbTintColor={COLOR.grey300}
            style={switchStyle}
            value={customer.potentialHost}
            onValueChange={
              () => this.toggleCustomerHostCallback(customer.id, customer.potentialHost)
            }
          />
        ),
      },
      {
        key: 'item3',
        iconKey: 'phone',
        text: customer.phone,
        onPress: () => { Linking.openURL(`tel:${customer.phone}`) },
        rightElement: (
          <MyIcon
            iconKey="chat"
            appMode="consultant"
            onPress={() => { Linking.openURL(`sms:${customer.phone}`) }}
          />
        ),
      },
      {
        key: 'item4',
        iconKey: 'email',
        text: customer.email,
        onPress: () => { Linking.openURL(`mailto:${customer.email}`) },
      },
      {
        key: 'item5',
        text: `Notes (${notes.length})`,
        onPress: () => { navigation.navigate('CustomerNotes', { customerId: customer.id, subscriptionId }) },
        rightElement: (
          <MyIcon
            iconKey="note"
            appMode="consultant"
            onPress={() => { navigation.navigate('CustomerNotes', { customerId: customer.id, subscriptionId }) }}
          />
        ),
      },
      {
        key: 'item6',
        centerElement: (
          <CallReminderMenu
            customerId={customer.id}
            subscriptionId={subscriptionId}
            callReminderSuccessCallback={this.callReminderSuccessCallback}
          />
        ),
      },
    ]


    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Customer"
        />
        <ScrollView style={{ flex: 1 }}>
          <Text style={headingStyle}>
            {`${customer.firstName} ${customer.lastName}`}
          </Text>
          <FlatList
            data={menuItems}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
              <ListItem
                leftElement={(item.iconKey === undefined) ? null : <MyIcon iconKey={item.iconKey} appMode="consultant" />}
                rightElement={item.rightElement}
                onLeftElementPress={() => item.onPress()}
                centerElement={(item.centerElement === undefined) ? (
                  <View onPress={item.onPress}>
                    <Text>
                      {item.text}
                    </Text>
                  </View>
                ) : item.centerElement
              }
                onPress={() => item.onPress()}
              />
            )}
          />

        </ScrollView>
        <Snackbar visible={isSnackBarVisible} message="Call reminder created!" onRequestClose={() => this.setState({ isSnackBarVisible: false })} />
        <Nav activeKey="customers" />
      </Container>
    )
  }
}
Customer.propTypes = {
  subscriptions: SubscriptionListPropType,
}

Customer.defaultProps = {
  subscriptions: [],
}

const mapStateToProps = state => ({
  subscriptions: state.subscriptions,
})

export default connect(mapStateToProps)(Customer)
