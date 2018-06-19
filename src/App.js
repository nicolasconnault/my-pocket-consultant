import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Text, View } from 'react-native';
import { connect } from "react-redux";
import { Root } from "native-base";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { COLOR } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import Notifications from "./screens/Customer/Notifications/";
import MyConsultants from "./screens/Customer/MyConsultants/";
import MyCompanies from "./screens/Customer/MyCompanies/";
import CompanyMenu from "./screens/Customer/CompanyMenu/";
import ContactMe from "./screens/Customer/ContactMe/";
import CompanyNews from "./screens/Customer/CompanyNews/";
import Tutorials from "./screens/Customer/Tutorials/";
import MyNews from "./screens/Customer/MyNews/";
import Settings from "./screens/Customer/Settings/";

import Customers from "./screens/Consultant/Customers/";
import Help from "./screens/Customer/Help/";
import SelectAConsultant from "./screens/Customer/SelectAConsultant/";
import CustomerDrawer from "./screens/Customer/Drawer.js";
import ConsultantDrawer from "./screens/Consultant/Drawer.js";

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
        
        let DrawerNavigation = createDrawerNavigator({
            Notifications: { screen: Notifications },
            MyConsultants: { screen: MyConsultants },
            MyCompanies: { screen: MyCompanies },
            ContactMe: { screen: ContactMe },
            CompanyNews: { screen: CompanyNews },
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
            MyNews: { screen: MyNews },
            SelectAConsultant: { screen: SelectAConsultant },
        }, {
            initialRouteName: 'Drawer',
            headerMode: 'none',
            navigationOptions: {
            },
        })
        return (
          <Root>
            <StackNavigation ref={nav => { this.navigator = nav }} />
          </Root>
      )
    }
}

const mapStateToProps = state => {
  return { appMode: state.appMode };
};
export default connect(mapStateToProps)(Main)
