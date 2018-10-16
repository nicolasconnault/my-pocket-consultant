import React from 'react'
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native'
import GridView from 'react-native-super-grid'
import { withNavigation } from 'react-navigation'

// TODO This needs to represent a screen listing all the companies for a given category
class NewSubscriptionTab extends React.Component {
  render() {
    const {
      categoryName,
      companies,
      topNavigation,
      deleteCallback,
      createCallback,
    } = this.props

    console.log(createCallback)
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <GridView
          style={{ flex: 1, padding: 5 }}
          itemDimension={64}
          items={companies}
          renderItem={item => (
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}
              onPress={() => topNavigation.navigate('EditSubscription', { company: item, createCallback, deleteCallback })}
            >
              <Image
                style={{ width: 64, height: 64 }}
                source={{ uri: item.logoUrl }}
              />
              <Text style={{ textAlign: 'center', height: 50, width: 64 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

export default withNavigation(NewSubscriptionTab)
