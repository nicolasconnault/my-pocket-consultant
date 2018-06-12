import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Text, View } from 'react-native';
import { Root } from "native-base";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { COLOR } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import Login from "./screens/Login/";
import SignUp from "./screens/SignUp/";

import Notifications from "./screens/Customer/Notifications/";
import MyConsultants from "./screens/Customer/MyConsultants/";
import MyCompanies from "./screens/Customer/MyCompanies/";
import MyNews from "./screens/Customer/MyNews/";
import Settings from "./screens/Customer/Settings/";
import Help from "./screens/Customer/Help/";
import SelectAConsultant from "./screens/Customer/SelectAConsultant/";

import Drawer from "./screens/Drawer.js";

const DrawerNavigation = createDrawerNavigator({
    Notifications: { screen: Notifications },
    MyConsultants: { screen: MyConsultants },
    MyCompanies: { screen: MyCompanies },
    MyNews: { screen: MyNews },
    Settings: { screen: Settings },
    Help: { screen: Help },
}, {
    initialRouteName: 'MyConsultants',
    contentComponent: props => <Drawer {...props} />
})

const StackNavigation = createStackNavigator({
    Drawer: { screen: DrawerNavigation },
    MyCompanies: { screen: MyCompanies },
    MyNews: { screen: MyNews },
    SelectAConsultant: { screen: SelectAConsultant },
}, {
    initialRouteName: 'Drawer',
    headerMode: 'none',
    navigationOptions: {
    }
})

export default () =>
  <Root>
    <StackNavigation />
  </Root>;
