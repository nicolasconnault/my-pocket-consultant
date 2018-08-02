import React, {
  PureComponent,
} from 'react'
import {
  View, Text, TouchableWithoutFeedback,
} from 'react-native'
import styles from './styles'

class SectionItem extends PureComponent {
  render() {
    const {
      callback,
      item,
      sectionItemViewStyle,
      sectionItemTextStyle
    } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => {
        callback()
      }}
      >
        <View style={[styles.itemStyle, sectionItemViewStyle]}>
          <Text style={[styles.artistText, sectionItemTextStyle]}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default SectionItem
