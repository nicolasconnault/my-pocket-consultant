import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar, View,
} from 'react-native'
import { Toolbar, Snackbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { MyIcon, Container } from '../../../../components'
import { NewsTypesListPropType } from '../../../../proptypes'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'
import NewsTypeTab from './Tab'

class SubscriptionNews extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('selectedSubscription')} News`,
    drawerLabel: 'News',
    drawerIcon: <MyIcon iconKey="news" appMode="consultant" />,
  })

  constructor(props) {
    super(props)
    this.state = {
      isSnackBarVisible: false,
      snackBarMessage: '',
    }
    this.newsItemSaveSuccessCallback = this.newsItemSaveSuccessCallback.bind(this)
    this.newsItemCreateSuccessCallback = this.newsItemCreateSuccessCallback.bind(this)
  }

  newsItemSaveSuccessCallback() {
    this.setState({ isSnackBarVisible: true, snackBarMessage: 'News Item Saved!' })
  }

  newsItemCreateSuccessCallback() {
    this.setState({ isSnackBarVisible: true, snackBarMessage: 'News Item Created!' })
  }

  render() {
    const screens = {}
    const { newsTypes, navigation } = this.props
    const {
      isSnackBarVisible,
      snackBarMessage,
    } = this.state

    const subscription = navigation.getParam('subscription')
    let selectedNewsType = navigation.getParam('newsType')

    newsTypes[subscription.companyLabel].forEach((newsType) => {
      if (selectedNewsType === undefined) {
        selectedNewsType = newsType
      }
      // For each company's category, create a new tab screen with that category's companies
      screens[newsType.label] = {
        screen: () => (
          <NewsTypeTab
            subscription={subscription}
            newsType={newsType}
            topNavigation={navigation}
            saveCallback={this.newsItemSaveSuccessCallback}
          />
        ),
      }
    })

    const TabNavigation = createMaterialTopTabNavigator(screens, {
      initialRouteName: selectedNewsType.label,
      headerMode: 'none',
      tabBarOptions: styles.tabBarOptions,
    })

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={`News: ${subscription.companyLabel}`}
        />
        <View style={{ flex: 1 }}>
          { newsTypes[subscription.companyLabel].length > 1 && (
            <TabNavigation />
          )}
          { newsTypes[subscription.companyLabel].length === 1 && (
            <NewsTypeTab
              subscription={subscription}
              newsType={selectedNewsType}
              topNavigation={navigation}
              saveCallback={this.newsItemSaveSuccessCallback}
            />
          )}
        </View>
        <Snackbar
          style={{ container: styles.snackBar.container, content: styles.snackBar.message }}
          visible={isSnackBarVisible}
          message={snackBarMessage}
          onRequestClose={() => this.setState({ isSnackBarVisible: false })}
        />
        <Nav activeKey="news" />
      </Container>
    )
  }
}

SubscriptionNews.propTypes = {
  newsTypes: NewsTypesListPropType,
}

SubscriptionNews.defaultProps = {
  newsTypes: [],
}
const mapStateToProps = state => ({
  newsTypes: state.newsTypes,
})

export default connect(mapStateToProps)(SubscriptionNews)
