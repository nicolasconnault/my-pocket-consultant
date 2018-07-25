import React from 'react'
import {
  Text, View,
} from 'react-native'
// TODO This needs to represent a screen listing all the companies for a given category
export default class NewSubscriptionTab extends React.Component {
  render() {
    const { categoryName, companies } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Text>
          { categoryName }
        </Text>
      </View>
    )
  }
}
