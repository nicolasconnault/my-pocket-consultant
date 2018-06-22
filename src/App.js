import React from "react"
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation"
import { Text, View } from 'react-native'
import { connect } from "react-redux"
import { Root } from "native-base"
import { ThemeProvider } from 'react-native-material-ui'
import { COLOR } from 'react-native-material-ui'

import Home from './screens/Home'
import Login from './screens/Login'
import Registration from './screens/Registration'
import MainScreen from './screens/Main'

import Notifications from "./screens/Customer/Notifications/"
import MyConsultants from "./screens/Customer/MyConsultants/"
import MyCompanies from "./screens/Customer/MyCompanies/"
import CompanyMenu from "./screens/Customer/CompanyMenu/"
import ContactMe from "./screens/Customer/ContactMe/"
import CompanyNews from "./screens/Customer/CompanyNews/"
import Tutorials from "./screens/Customer/Tutorials/"
import Tutorial from "./screens/Customer/Tutorial/"
import MyNews from "./screens/Customer/MyNews/"
import Settings from "./screens/Customer/Settings/"
import VideoPlayer from "./screens/VideoPlayer"

import Customers from "./screens/Consultant/Customers/"
import Help from "./screens/Customer/Help/"
import SelectAConsultant from "./screens/Customer/SelectAConsultant/"
import CustomerDrawer from "./screens/Customer/Drawer.js"
import ConsultantDrawer from "./screens/Consultant/Drawer.js"

import ConsultantTheme from './ConsultantTheme'
import CustomerTheme from './CustomerTheme'

export let navigatorRef

class Main extends React.Component {

    componentDidMount() {
        navigatorRef = this.navigator
    }

    render () {
        let appMode = 'customer'
        if (this.props.appMode != undefined) {
            appMode = this.props.appMode
        }
        
        let uiTheme = (appMode == 'consultant') ? ConsultantTheme : CustomerTheme 

        let CustomerNavigation = createDrawerNavigator({
            Notifications: { screen: Notifications },
            MyConsultants: { screen: MyConsultants },
            MyCompanies: { screen: MyCompanies },
            Tutorials: { screen: Tutorials },
            MyNews: { screen: MyNews },
            Settings: { screen: Settings },
            Help: { screen: Help },
        }, {
            backBehavior: 'initialRoute',
            initialRouteName: 'MyConsultants',
            contentComponent: props => <CustomerDrawer {...props} />
        })

        let ConsultantNavigation = createDrawerNavigator({
            Customers: { screen: Customers },
            MyConsultants: { screen: MyConsultants },
            MyCompanies: { screen: MyCompanies },
            MyNews: { screen: MyNews },
            Settings: { screen: Settings },
            VideoPlayer: { screen: VideoPlayer },
            Help: { screen: Help },
        }, {
            initialRouteName: 'Customers',
            backBehavior: 'initialRoute',
            contentComponent: props => <ConsultantDrawer {...props} />
        })

        let AppModeNavigation = createSwitchNavigator( {
            CustomerMode: { screen: CustomerNavigation },
            ConsultantMode: { screen: ConsultantNavigation }
        }, {
            initialRoute:  (appMode == 'consultant') ? 'ConsultantMode' : 'CustomerMode'
        })

        let StackNavigation = createStackNavigator({
            AppMode: { screen: AppModeNavigation },
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
            VideoPlayer: { screen: VideoPlayer },
            SelectAConsultant: { screen: SelectAConsultant },
        }, {
            initialRouteName: 'AppMode',
            headerMode: 'none',
            navigationOptions: {
            },
        })

        let LoggedOutNavigation = createStackNavigator({
            Login: { screen: Login },
            Registration: { screen: Registration },

        }, {
            initialRouteName: 'Login',
        })

        let SwitchNavigation = createSwitchNavigator({
            LoggedIn: { screen: StackNavigation },
            LoggedOut: { screen: LoggedOutNavigation }
        }, {
            initialRouteName: this.props.user ? 'LoggedIn' : 'LoggedOut'
        })

        return (
          <ThemeProvider uiTheme={uiTheme}>
            <Root>
              <SwitchNavigation ref={nav => { this.navigator = nav }} />
            </Root>
          </ThemeProvider>
      )
    }
}

const mapStateToProps = state => {
    console.log(state)
  return { 
    appMode: state.appMode,
    user: state.user
  }
}
export default connect(mapStateToProps)(Main)
