import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Text, View } from 'react-native';
import { Root } from "native-base";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from 'react-native-material-ui';

import Login from "./screens/Login/";
import SignUp from "./screens/SignUp/";
import MyConsultants from "./screens/MyConsultants/";
import MyCompanies from "./screens/MyCompanies/";
import MyNews from "./screens/MyNews/";
import SelectAConsultant from "./screens/SelectAConsultant/";
import Drawer from "./screens/Drawer.js";

const StackNavigation = createStackNavigator({
    MyConsultants: { screen: MyConsultants },
    MyCompanies: { screen: MyCompanies },
    MyNews: { screen: MyNews },
    SelectAConsultant: { screen: SelectAConsultant },
}, {
    initialRouteName: 'MyConsultants',
    headerMode: 'none',
    navigationOptions: {
    }
})

const DrawerNavigation = createDrawerNavigator({
    StackNavigation: { screen: StackNavigation },
    MyConsultants: { screen: MyConsultants },
    MyCompanies: { screen: MyCompanies },
    MyNews: { screen: MyNews },
}, {
    initialRouteName: 'StackNavigation',
    contentComponent: props => <Drawer {...props} />
})

const FooterTabNavigation = createMaterialBottomTabNavigator({
    "My Consultants": DrawerNavigation,
    "My News": MyNews,
    "My Companies": MyCompanies
    },
  {
    initialRouteName: 'My Consultants',
    barStyle: {
      backgroundColor: COLOR.pink500,
    },
    inactiveTintColor: COLOR.grey300,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'My Consultants') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'My News') {
          iconName = `ios-megaphone${focused ? '' : '-outline'}`;
        } else if (routeName === 'My Companies') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
)

export default () =>
  <Root>
    <FooterTabNavigation />
  </Root>;
