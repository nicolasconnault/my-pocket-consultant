import React from 'react'
import { connect } from 'react-redux'
import {
  Text, View, FlatList,
} from 'react-native'
import { ListItem, Dialog, DialogDefaultActions } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import styles from '../../../styles'
import { MyIcon, SubscriptionConfirmModal } from '../../../../components'
import { SubscriptionPropType } from '../../../../proptypes'
import { deactivateSubscription } from '../../../../actions'

class SubscriptionMenuTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShown: false,
    }

    this.modalHandler = this.modalHandler.bind(this)
    this.dispatchDeactivateSubscription = this.dispatchDeactivateSubscription.bind(this)
  }

  // This prepares the modal for the selectConsultant action and displays the modal
  modalHandler() {
    this.setState({ modalShown: true })
  }

  dispatchDeactivateSubscription(subscriptionId, action) {
    const {
      subscription,
      dispatch,
    } = this.props

    if (action === 'confirm') {
      dispatch(deactivateSubscription(subscription.id))
    } else {
      this.setState({ modalShown: false })
    }
  }

  render() {
    const {
      topNavigation,
      subscription,
      emptyCustomerListCallback,
    } = this.props
    const { modalShown } = this.state
    const { listMenuStyle } = styles
    const menuItems = [
      {
        iconKey: 'people',
        text: `${subscription.customerCount} Customers`,
        onPress: () => {
          if (subscription.customerCount > 0) {
            topNavigation.navigate('Customers', { subscription })
          } else {
            emptyCustomerListCallback()
          }
        },
      },
      {
        iconKey: 'news',
        text: 'Manage News',
        onPress: () => {
          topNavigation.navigate('ManageNews', { subscription })
        },
      },
      {
        iconKey: 'school',
        text: 'Tutorials',
        onPress: () => {
          topNavigation.navigate('ManageTutorials', { subscription })
        },
      },
    ]

    if (subscription.active) {
      menuItems.push({
        iconKey: 'pause',
        text: 'Deactivate Subscription',
        onPress: this.modalHandler,
      })
    }

    const modal = (modalShown === false) ? null : (
      <SubscriptionConfirmModal
        subscription={subscription}
        dispatchFunction={this.dispatchDeactivateSubscription}
      />
    )

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={listMenuStyle}
          data={menuItems}
          keyExtractor={item => item.iconKey}
          renderItem={({ item }) => (
            <ListItem
              leftElement={<MyIcon iconKey={item.iconKey} appMode="consultant" />}
              onLeftElementPress={() => item.onPress()}
              centerElement={(
                <View onPress={item.onPress}>
                  <Text>
                    {item.text}
                  </Text>
                </View>
              )}
              onPress={() => item.onPress()}
            />
          )}
        />
        {modal}
      </View>
    )
  }
}

SubscriptionMenuTab.propTypes = {
  subscription: SubscriptionPropType,
}

SubscriptionMenuTab.defaultProps = {
  subscription: [],
}

export default withNavigation(connect()(SubscriptionMenuTab))
