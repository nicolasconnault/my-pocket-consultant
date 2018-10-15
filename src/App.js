import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { Root } from 'native-base'
import { ThemeProvider } from 'react-native-material-ui'

import {
  CUSTOMER_MODE_COLOR,
  CONSULTANT_MODE_COLOR,
  ACCESS_TOKEN,
  DEFAULT_MODE,
} from './config'
import * as actions from './actions'
import * as screens from './screens'
import * as customerScreens from './screens/Customer'
import * as consultantScreens from './screens/Consultant'
import Drawer from './screens/Drawer'
import ConsultantTheme from './ConsultantTheme'
import CustomerTheme from './CustomerTheme'
import { Loader } from './components'

import * as proptypes from './proptypes'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
      if (token !== null && token.length > 0) {
        this.initialiseStore(token)
      }
    })
  }

  async initialiseStore(token) {
    const {
      dispatch,
      companies,
      categoryCompanies,
      notifications,
      subscriptions,
      consultants,
      tutorials,
      user,
      newsTypes,
    } = this.props

    this.setState({ loading: true })
    if (companies === null) {
      await dispatch(actions.fetchCustomerCompanies(token))
    }
    if (categoryCompanies === undefined) {
      await dispatch(actions.fetchCompaniesByCategory(token))
    }
    if (subscriptions.length === 0) {
      await dispatch(actions.fetchSubscribedCompanies(token))
    }
    if (notifications.length === 0) {
      await dispatch(actions.fetchNotifications(token))
    }
    if (consultants.length === 0) {
      await dispatch(actions.fetchConsultants(token))
    }
    if (tutorials.length === 0) {
      await dispatch(actions.fetchTutorials(token))
    }
    if (user === null) {
      await dispatch(actions.fetchUser(token))
    }
    if (newsTypes.length === 0) {
      await dispatch(actions.fetchNewsTypes(token))
    }
    this.setState({ loading: false })
  }

  render() {
    let { appMode } = this.props
    const { user } = this.props
    const { loading } = this.state

    appMode = (appMode === null) ? DEFAULT_MODE : appMode
    const uiTheme = (appMode === 'consultant') ? ConsultantTheme : CustomerTheme

    let DrawerNavigation = createDrawerNavigator({
      Notifications: { screen: customerScreens.Notifications },
      MyCompanies: { screen: customerScreens.MyCompanies },
      CompanySettings: { screen: customerScreens.CompanySettings },
      Settings: { screen: customerScreens.Settings },
      Help: { screen: customerScreens.Help },
    }, {
      backBehavior: 'initialRoute',
      initialRouteName: 'MyCompanies',
      contentComponent: props => <Drawer appMode={appMode} {...props} />,
      contentOptions: {
        activeTintColor: (DEFAULT_MODE === 'customer') ? CUSTOMER_MODE_COLOR : CONSULTANT_MODE_COLOR,
        inactiveTintColor: '#666666',
      },
    })

    if (appMode === 'consultant') {
      DrawerNavigation = createDrawerNavigator({
        TodoList: { screen: consultantScreens.TodoList },
        Subscriptions: { screen: consultantScreens.Subscriptions },
        Customers: { screen: consultantScreens.Customers },
        News: { screen: consultantScreens.ManageNews },
        Settings: { screen: consultantScreens.ConsultantSettings },
        Help: { screen: consultantScreens.ConsultantHelp },
        Terms: { screen: consultantScreens.Terms },
      }, {
        initialRouteName: 'Subscriptions',
        backBehavior: 'initialRoute',
        contentComponent: props => <Drawer appMode={appMode} {...props} />,
        contentOptions: {
          activeTintColor: CONSULTANT_MODE_COLOR,
          inactiveTintColor: '#666666',
          itemsContainerStyle: {
            marginVertical: 15,
          },
          iconContainerStyle: {
            opacity: 1,
          },
        },
      })
    }

    let StackNavigation = createStackNavigator({
      Drawer: { screen: DrawerNavigation },
      Login: { screen: screens.Login },
      Registration: { screen: screens.Registration },
      Home: { screen: screens.Home },
      Main: { screen: screens.MainScreen },

      MyCompanies: { screen: customerScreens.MyCompanies },
      CompanySettings: { screen: customerScreens.CompanySettings },
      CompanyMenu: { screen: customerScreens.CompanyMenu },
      CompanyNotifications: { screen: customerScreens.CompanyNotifications },
      Tutorials: { screen: customerScreens.Tutorials },
      Tutorial: { screen: customerScreens.Tutorial },
      ContactMe: { screen: customerScreens.ContactMe },
      CompanyNews: { screen: customerScreens.CompanyNews },
      Profile: { screen: customerScreens.Profile },
      MyNews: { screen: customerScreens.MyNews },
      NewsItem: { screen: customerScreens.NewsItem },
      SelectAConsultant: { screen: customerScreens.SelectAConsultant },

      ConsultantHelp: { screen: consultantScreens.ConsultantHelp },
      NewSubscription: { screen: consultantScreens.NewSubscription },
      EditSubscription: { screen: consultantScreens.EditSubscription },
      SubscriptionMenu: { screen: consultantScreens.SubscriptionMenu },
      Customers: { screen: consultantScreens.Customers },
      Customer: { screen: consultantScreens.Customer },
      CustomerNotes: { screen: consultantScreens.CustomerNotes },
      NewCustomerNote: { screen: consultantScreens.NewNote },
      EditCustomerNote: { screen: consultantScreens.EditNote },
      ManageNews: { screen: consultantScreens.ManageNews },
      SubscriptionNews: { screen: consultantScreens.SubscriptionNews },
      CreateNewsItem: { screen: consultantScreens.CreateNewsItem },
      EditNewsItem: { screen: consultantScreens.EditNewsItem },
      ManageTutorials: { screen: consultantScreens.ManageTutorials },
    }, {
      initialRouteName: 'Drawer',
      headerMode: 'none',
      navigationOptions: {
      },
    })

    if (Object.keys(user).length === 0) {
      StackNavigation = createStackNavigator({
        Login: { screen: screens.Login },
        Registration: { screen: screens.Registration },
      }, {
        initialRouteName: 'Login',
        headerMode: 'none',
      })
    }

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Root>
          {loading && (
          <Loader loading={loading} />
          )}
          {loading === false && (
          <StackNavigation />
          )}
        </Root>
      </ThemeProvider>
    )
  }
}

Main.propTypes = {
  user: proptypes.UserPropType,
  appMode: proptypes.AppModePropType,
  companies: proptypes.CompanyListPropType,
  subscriptions: proptypes.SubscriptionListPropType,
  consultants: proptypes.UserListPropType,
  notifications: proptypes.NotificationListPropType,
  tutorials: proptypes.TutorialListPropType,
  newsTypes: proptypes.NewsTypesListPropType,
}
Main.defaultProps = {
  user: null,
  appMode: 'consultant',
  companies: null,
  subscriptions: [],
  notifications: [],
  consultants: [],
  tutorials: [],
  newsTypes: [],
}
const mapStateToProps = state => ({
  appMode: state.appMode,
  user: state.user,
})
export default connect(mapStateToProps)(Main)
