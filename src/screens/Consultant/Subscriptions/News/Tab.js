import React from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import {
  View, FlatList,
} from 'react-native'
import { ListItem, ActionButton } from 'react-native-material-ui'

import { SubscriptionPropType, NewsTypePropType } from '../../../../proptypes'
import styles from '../../../styles'
import { MyIcon } from '../../../../components'
import { DATE_FORMAT, CONSULTANT_MODE_COLOR } from '../../../../config'
import NewsItemMenu from './NewsItemMenu'

class NewsTypeTab extends React.Component {
  render() {
    const {
      topNavigation,
      subscription,
      newsType,
      saveCallback,
      toggleCallback,
      deleteCallback,
      createCallback,
    } = this.props
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
              style={{ container: { opacity: (item.active) ? 1 : 0.38 } }}
              centerElement={{
                primaryText: item.title,
                secondaryText: `${Moment(item.startDate).format(DATE_FORMAT)} - ${Moment(item.endDate).format(DATE_FORMAT)}`,
              }}
              rightElement={(
                <NewsItemMenu
                  newsItem={item}
                  topNavigation={topNavigation}
                  saveCallback={saveCallback}
                  toggleCallback={toggleCallback}
                  deleteCallback={deleteCallback}
                />
              )}
              onPress={() => topNavigation.navigate('EditNewsItem', {
                newsItem: item,
                subscription,
                saveCallback,
              })}
            />
          )}
        />
        <ActionButton
          style={{ container: { backgroundColor: CONSULTANT_MODE_COLOR } }}
          icon={<MyIcon iconKey="add" color="#FFFFFF" />}
          onPress={() => topNavigation.navigate('CreateNewsItem', { subscription, newsType, createCallback })}
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
