import React from 'react'
import {
  Text, View, FlatList,
} from 'react-native'
import { ListItem } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import styles from '../../../styles'
import { MyIcon } from '../../../../components'
import { SubscriptionPropType } from '../../../../proptypes'

class SubscriptionMenuTab extends React.Component {
  render() {
    const { topNavigation, subscription } = this.props
    const { listMenuStyle } = styles
    const menuItems = [
      {
        iconKey: 'people',
        text: `${subscription.customerCount} Customers`,
        onPress: () => {
          topNavigation.navigate('Customers', { subscription })
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
