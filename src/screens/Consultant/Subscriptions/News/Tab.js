import React from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import {
  View, FlatList,
} from 'react-native'
import { ListItem } from 'react-native-material-ui'

import { SubscriptionPropType, NewsTypePropType } from '../../../../proptypes'
import styles from '../../../styles'
import { DATE_FORMAT } from '../../../../config'
import NewsItemMenu from './NewsItemMenu'

class NewsTypeTab extends React.Component {
  render() {
    const { topNavigation, subscription, newsType } = this.props
    const { listMenuStyle } = styles
    const newsItems = []
    subscription.newsItems.forEach((newsItem) => {
      if (newsItem.newsType.id === newsType.id) {
        newsItems.push(newsItem)
      }
    })

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={listMenuStyle}
          data={newsItems}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <ListItem
              centerElement={{
                primaryText: item.title,
                secondaryText: `${Moment(item.startDate).format(DATE_FORMAT)} - ${Moment(item.endDate).format(DATE_FORMAT)}`,
              }}
              rightElement={(
                <NewsItemMenu newsItem={item} />
              )}
              onPress={() => topNavigation.navigate('SubscriptionNewsItem', { newsType: item.id, subscription })}
            />
          )}
        />
      </View>
    )
  }
}
NewsTypeTab.propTypes = {
  subscription: SubscriptionPropType,
  newsType: NewsTypePropType,
}

NewsTypeTab.defaultProps = {
  subscription: null,
  newsType: null,
}
const mapStateToProps = state => ({
  newsTypes: state.newsTypes,
})

export default connect(mapStateToProps)(NewsTypeTab)
