import React from 'react'
import {
  Text, View, FlatList,
} from 'react-native'
import { ListItem, Dialog, DialogDefaultActions } from 'react-native-material-ui'
// TODO Create a ConfirmModal to confirm deactivation of subscription. Similar to components/ConsultantCard/ConfirmModal.js
import { withNavigation } from 'react-navigation'

import styles from '../../../styles'
import { MyIcon } from '../../../../components'
import { SubscriptionPropType } from '../../../../proptypes'


class SubscriptionMenuTab extends React.Component {
  render() {
    const {
      topNavigation,
      subscription,
      emptyCustomerListCallback,
      deactivateSubscriptionCallback,
    } = this.props
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
        onPress: () => {
          deactivateSubscriptionCallback()
        },
      })
    }

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

export default withNavigation(SubscriptionMenuTab)
