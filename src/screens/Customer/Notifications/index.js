import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  AsyncStorage,
  View,
  Image,
  RefreshControl,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import { SwipeListView } from 'react-native-swipe-list-view'

import { NotificationListPropType } from '../../../proptypes'
import { MyIcon, Container } from '../../../components'
import { STORAGE_URL, ACCESS_TOKEN } from '../../../config'
import { removeNotification, fetchNotifications } from '../../../actions'
import styles from '../../styles'

class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
    drawerIcon: <MyIcon iconKey="notifications" />,
  };

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  onRefresh = async () => {
    this.setState({ refreshing: true })
    const { dispatch } = this.props
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    dispatch(fetchNotifications(token)).then(() => {
      this.setState({ refreshing: false })
    })
  }

  removeNotification(id) {
    const { dispatch } = this.props
    dispatch(removeNotification(id))
  }

  navigateToNewsItem(newsItem, company) {
    const { navigation } = this.props
    // this.removeNotification(newsItem.id)
    navigation.navigate('NewsItem', { newsItem, company })
  }

  render() {
    const { navigation, notifications } = this.props
    const { refreshing } = this.state
    const { listMenuStyle } = styles

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Notifications"
        />
        <View style={{ flex: 1 }}>
          <SwipeListView
            useFlatList
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            )}
            style={listMenuStyle}
            data={notifications}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <ListItem
                divider
                ref={React.createRef()}
                leftElement={(
                  <Image
                    style={{ width: 36, height: 36 }}
                    source={{ uri: item.company.logoUrl }}
                  />)
                }
                onLeftElementPress={() => navigation.navigate('NewsItem', { newsItem: item.newsItem })}
                centerElement={{
                  primaryText: item.newsItem.title,
                  secondaryText: item.newsItem.description,
                }}
                onPress={() => this.navigateToNewsItem(item.newsItem, item.company)}
              />
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack} />
            )}
            onRowClose={(rowKey) => { this.removeNotification(rowKey) }}
          />
        </View>
      </Container>
    )
  }
}

Notifications.propTypes = {
  notifications: NotificationListPropType,
}
Notifications.defaultProps = {
  notifications: [],
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  }
}

export default connect(mapStateToProps)(Notifications)
