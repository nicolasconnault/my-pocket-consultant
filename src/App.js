import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { FluidNavigator } from 'react-navigation-fluid-transitions'
import { connect } from 'react-redux'
import { Root } from 'native-base'
import { ThemeProvider } from 'react-native-material-ui'

import { CUSTOMER_MODE_COLOR, CONSULTANT_MODE_COLOR } from './config'

import {
  Home,
  Login,
  Logout,
  Registration,
  MainScreen,
} from './screens'

import {
  CompanySettings,
  MyCompanies,
  Notifications,
  CompanyMenu,
  CompanyNotifications,
  ContactMe,
  CompanyNews,
  Tutorials,
  Tutorial,
  MyNews,
  Profile,
  NewsItem,
  Settings,
  SelectAConsultant,
  Help,
} from './screens/Customer'

import {
  Customers,
  TodoList,
  Subscriptions,
  NewSubscription,
  SubscriptionMenu,
  ManageNews,
  ManageTutorials,
  ConsultantSettings,
  Terms,
  ConsultantHelp,
} from './screens/Consultant'

import News from './screens/Consultant/Subscriptions/News'

import Drawer from './screens/Drawer'

import ConsultantTheme from './ConsultantTheme'
import CustomerTheme from './CustomerTheme'

import { UserPropType, AppModePropType } from './proptypes'

class Main extends React.Component {
  render() {
    let { appMode } = this.props
    const { user } = this.props
    const uiTheme = (appMode === 'consultant') ? ConsultantTheme : CustomerTheme
    appMode = (appMode === null) ? 'consultant' : appMode

    let DrawerNavigation = createDrawerNavigator({
      Notifications: { screen: Notifications },
      MyCompanies: { screen: MyCompanies },
      CompanySettings: { screen: CompanySettings },
      Settings: { screen: Settings },
      Help: { screen: Help },
      Logout: { screen: Logout },
    }, {
      backBehavior: 'initialRoute',
      initialRouteName: 'MyCompanies',
      contentComponent: props => <Drawer appMode={appMode} {...props} />,
      contentOptions: {
        activeTintColor: CUSTOMER_MODE_COLOR,
        inactiveTintColor: '#666666',
      },
    })

    if (appMode === 'consultant') {
      DrawerNavigation = createDrawerNavigator({
        TodoList: { screen: TodoList },
        Subscriptions: { screen: Subscriptions },
        Customers: { screen: Customers },
        News: { screen: News },
        Settings: { screen: ConsultantSettings },
        Logout: { screen: Logout },
        Help: { screen: ConsultantHelp },
        Terms: { screen: Terms },
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
      Login: { screen: Login },
      Registration: { screen: Registration },
      Home: { screen: Home },
      Main: { screen: MainScreen },
      MyCompanies: { screen: MyCompanies },
      CompanySettings: { screen: CompanySettings },
      CompanyMenu: { screen: CompanyMenu },
      CompanyNotifications: { screen: CompanyNotifications },
      Tutorials: { screen: Tutorials },
      Tutorial: { screen: Tutorial },
      ContactMe: { screen: ContactMe },
      CompanyNews: { screen: CompanyNews },
      Profile: { screen: Profile },
      MyNews: { screen: MyNews },
      NewsItem: { screen: NewsItem },
      ConsultantHelp: { screen: ConsultantHelp },
      SelectAConsultant: { screen: SelectAConsultant },
      NewSubscription: { screen: NewSubscription },
      SubscriptionMenu: { screen: SubscriptionMenu },
      Customers: { screen: Customers },
      ManageNews: { screen: ManageNews },
      ManageTutorials: { screen: ManageTutorials },
    }, {
      initialRouteName: 'Drawer',
      headerMode: 'none',
      navigationOptions: {
      },
    })

    if (Object.keys(user).length === 0) {
      StackNavigation = createStackNavigator({
        Login: { screen: Login },
        Registration: { screen: Registration },
      }, {
        initialRouteName: 'Login',
        headerMode: 'none',
      })
    }

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Root>
          <StackNavigation />
        </Root>
      </ThemeProvider>
    )
  }
}

Main.propTypes = {
  user: UserPropType,
  appMode: AppModePropType,
}
Main.defaultProps = {
  user: null,
  appMode: 'consultant',
}
const mapStateToProps = state => ({
  appMode: state.appMode,
  user: state.user,
})
export default connect(mapStateToProps)(Main)
