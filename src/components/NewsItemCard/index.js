import React, { Component } from 'react'
import {
  LayoutAnimation,
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
} from 'react-native'

import { } from '../../proptypes'

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
})

class NewsItemCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  navigateToNewsItem(newsItem, company) {
    const { navigation } = this.props
    // this.removeNotification(newsItem.id)
    navigation.navigate('NewsItem', { newsItem, company })
  }

  render() {
    const { newsItem, company } = this.props
    const {
      gridView,
      itemContainer,
      itemName,
      itemCode,
    } = styles

    const {
      id,
      title,
      description,
      startDate,
      endDate,
      type,
      url,
      regularPrice,
      discountedPrice,
      imageUrl,
    } = newsItem

    return (
      <TouchableNativeFeedback
        onPress={() => this.navigateToNewsItem(newsItem, company)}
      >
        <View style={itemContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', height: '100%' }}
          />
          <Text style={{ textAlign: 'center' }}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

NewsItemCard.propTypes = {
}
NewsItemCard.defaultProps = {
}

export default NewsItemCard
