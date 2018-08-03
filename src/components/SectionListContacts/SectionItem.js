import React, {
  PureComponent,
} from 'react'
import {
  View, Text, TouchableWithoutFeedback,
} from 'react-native'
import { UserAvatar } from '..'
import styles from './styles'

class SectionItem extends PureComponent {
  render() {
    const {
      callback,
      item,
    } = this.props
    const {
      itemStyle,
      artistText,
      avatarStyle,
    } = styles
    return (
      <TouchableWithoutFeedback onPress={() => {
        callback()
      }}
      >
        <View style={itemStyle}>
          <UserAvatar style={avatarStyle} userId={item.id} />
          <Text style={artistText}>
            {item.firstName}
            {' '}
            {item.lastName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default SectionItem
