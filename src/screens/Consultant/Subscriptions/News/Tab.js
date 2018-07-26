import React from 'react'
import {
  Text, View, FlatList,
} from 'react-native'
import { ListItem } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import styles from '../../../styles'

class SubscriptionNewsTab extends React.Component {
  render() {
    const { navigation, subscription } = this.props
    const { listMenuStyle } = styles
    const { newsItems } = subscription

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={listMenuStyle}
          data={newsItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              centerElement={(
                <View>
                  <Text>
                    {item.title}
                  </Text>
                </View>
              )}
              onPress={() => navigation.navigate('SubscriptionNewsItem', { newsItem: item, subscription })}
            />
          )}
        />
      </View>
    )
  }
}

export default withNavigation(SubscriptionNewsTab)
