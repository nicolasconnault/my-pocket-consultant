import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Text, View } from 'react-native';
import { connect } from "react-redux";
import { Root } from "native-base";
import { ThemeProvider } from 'react-native-material-ui'
import { COLOR } from 'react-native-material-ui';

import Notifications from "./screens/Customer/Notifications/";
import MyConsultants from "./screens/Customer/MyConsultants/";
import MyCompanies from "./screens/Customer/MyCompanies/";
import CompanyMenu from "./screens/Customer/CompanyMenu/";
import ContactMe from "./screens/Customer/ContactMe/";
import CompanyNews from "./screens/Customer/CompanyNews/";
import Tutorials from "./screens/Customer/Tutorials/";
import Tutorial from "./screens/Customer/Tutorial/";
import MyNews from "./screens/Customer/MyNews/";
import Settings from "./screens/Customer/Settings/";
import VideoPlayer from "./screens/VideoPlayer";

import Customers from "./screens/Consultant/Customers/";
import Help from "./screens/Customer/Help/";
import SelectAConsultant from "./screens/Customer/SelectAConsultant/";
import CustomerDrawer from "./screens/Customer/Drawer.js";
import ConsultantDrawer from "./screens/Consultant/Drawer.js";

import ConsultantTheme from './ConsultantTheme'
import CustomerTheme from './CustomerTheme'

export let navigatorRef

class Main extends React.Component {

    componentDidMount() {
        navigatorRef = this.navigator;
    }

    render () {
        let appMode = 'customer'
        if (this.props.appMode != undefined) {
            appMode = this.props.appMode
        }
        
        let uiTheme = (appMode == 'consultant') ? ConsultantTheme : CustomerTheme

        let DrawerNavigation = createDrawerNavigator({
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

        if (appMode == 'consultant') {
            DrawerNavigation = createDrawerNavigator({
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
        }

        const StackNavigation = createStackNavigator({
            Drawer: { screen: DrawerNavigation },
            MyCompanies: { screen: MyCompanies },
            CompanyMenu: { screen: CompanyMenu },
            Tutorials: { screen: Tutorials },
            Tutorial: { screen: Tutorial },
            ContactMe: { screen: ContactMe },
            CompanyNews: { screen: CompanyNews },
            MyNews: { screen: MyNews },
            VideoPlayer: { screen: VideoPlayer },
            SelectAConsultant: { screen: SelectAConsultant },
        }, {
            initialRouteName: 'Drawer',
            headerMode: 'none',
            navigationOptions: {
            },
        })
        return (
          <ThemeProvider uiTheme={uiTheme}>
            <Root>
              <StackNavigation ref={nav => { this.navigator = nav }} />
            </Root>
          </ThemeProvider>
      )
    }
}

const mapStateToProps = state => {
  return { appMode: state.appMode };
};
export default connect(mapStateToProps)(Main)
