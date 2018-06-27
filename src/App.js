import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { Root } from 'native-base'
import { ThemeProvider } from 'react-native-material-ui'

import Home from './screens/Home'
import Login from './screens/Login'
import Logout from './screens/Logout'
import Registration from './screens/Registration'
import MainScreen from './screens/Main'

import Notifications from './screens/Customer/Notifications'
import MyConsultants from './screens/Customer/MyConsultants'
import MyCompanies from './screens/Customer/MyCompanies'
import CompanyMenu from './screens/Customer/CompanyMenu'
import ContactMe from './screens/Customer/ContactMe'
import CompanyNews from './screens/Customer/CompanyNews'
import Tutorials from './screens/Customer/Tutorials'
import Tutorial from './screens/Customer/Tutorial'
import MyNews from './screens/Customer/MyNews'
import Settings from './screens/Customer/Settings'
import SelectAConsultant from './screens/Customer/SelectAConsultant'
import Help from './screens/Customer/Help'

import Customers from './screens/Consultant/Customers'
import TodoList from './screens/Consultant/TodoList'
import Subscriptions from './screens/Consultant/Subscriptions'
import ConsultantSettings from './screens/Consultant/Settings'
import Terms from './screens/Consultant/Terms'
import ConsultantHelp from './screens/Consultant/Help'
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
    appMode = (appMode === null) ? 'customer' : appMode

    let DrawerNavigation = createDrawerNavigator({
      Notifications: { screen: Notifications },
      MyConsultants: { screen: MyConsultants },
      MyCompanies: { screen: MyCompanies },
      Tutorials: { screen: Tutorials },
      MyNews: { screen: MyNews },
      Settings: { screen: Settings },
      Help: { screen: Help },
      Logout: { screen: Logout },
    }, {
      backBehavior: 'initialRoute',
      initialRouteName: 'MyConsultants',
      contentComponent: props => <Drawer appMode={appMode} {...props} />,
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
        Terms: { label: 'Terms & conditions', screen: Terms },
      }, {
        initialRouteName: 'Customers',
        backBehavior: 'initialRoute',
        contentComponent: props => <Drawer appMode={appMode} {...props} />,
        contentOptions: {
          activeTintColor: '#e90000',
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
      MyConsultants: { screen: MyConsultants },
      CompanyMenu: { screen: CompanyMenu },
      Tutorials: { screen: Tutorials },
      Tutorial: { screen: Tutorial },
      ContactMe: { screen: ContactMe },
      CompanyNews: { screen: CompanyNews },
      MyNews: { screen: MyNews },
      ConsultantHelp: { screen: ConsultantHelp },
      SelectAConsultant: { screen: SelectAConsultant },
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
  appMode: 'customer',
}
const mapStateToProps = state => ({
  appMode: state.appMode,
  user: state.user,
})
export default connect(mapStateToProps)(Main)
