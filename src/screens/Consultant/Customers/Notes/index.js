import React from 'react'
import { connect } from 'react-redux'
import {
  Text, StatusBar, View, FlatList,
} from 'react-native'
import { Toolbar, ActionButton } from 'react-native-material-ui'

import NoteCard from './NoteCard'
import { Container, MyIcon } from '../../../../components'
import Nav from '../../ConsultantNav'
import { SubscriptionListPropType } from '../../../../proptypes'
import styles from '../../../styles'
import { CONSULTANT_MODE_COLOR } from '../../../../config'

class CustomerNotes extends React.Component {
  static navigationOptions = {
    title: 'Customer Notes',
  }

  render() {
    const { subscriptions, navigation } = this.props
    const { headingStyle } = styles
    const subscriptionId = navigation.getParam('subscriptionId')
    const customerId = navigation.getParam('customerId')
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

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Customer Notes"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={(
              <Text style={headingStyle}>
                {`${customer.firstName} ${customer.lastName}`}
              </Text>
            )}
            data={notes}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                customer={customer}
                subscriptionId={subscriptionId}
                topNavigation={navigation}
              />
            )}
          />
          <ActionButton
            style={{ container: { backgroundColor: CONSULTANT_MODE_COLOR } }}
            icon={<MyIcon iconKey="add" color="#FFFFFF" />}
            onPress={() => navigation.navigate('NewCustomerNote', { subscriptionId, customer })}
          />
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}

CustomerNotes.propTypes = {
  subscriptions: SubscriptionListPropType,
}

CustomerNotes.defaultProps = {
  subscriptions: [],
}

const mapStateToProps = state => ({
  subscriptions: state.subscriptions,
})

export default connect(mapStateToProps)(CustomerNotes)
