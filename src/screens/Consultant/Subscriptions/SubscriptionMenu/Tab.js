import React from 'react'
import {
  Text, View, FlatList,
} from 'react-native'
import { ListItem } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import styles from '../../../styles'
import { MyIcon } from '../../../../components'

class SubscriptionMenuTab extends React.Component {
  render() {
    const { navigation, subscription } = this.props
    const { listMenuStyle } = styles
    const menuItems = [
      {
        iconKey: 'people',
        text: `${subscription.customerCount} Customers`,
        onPress: () => {
          navigation.navigate('Customers', { subscription })
        },
      },
      {
        iconKey: 'news',
        text: 'Manage News',
        onPress: () => {
          navigation.navigate('ManageNews', { subscription })
        },
      },
      {
        iconKey: 'school',
        text: 'Tutorials',
        onPress: () => {
          navigation.navigate('ManageTutorials', { subscription })
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
              leftElement={<MyIcon iconKey={item.iconKey} />}
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

export default withNavigation(SubscriptionMenuTab)
