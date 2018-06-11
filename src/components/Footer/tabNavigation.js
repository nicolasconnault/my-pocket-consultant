import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from 'react-native-material-ui';
import MyConsultants from "../../screens/MyConsultants/";
import MyCompanies from "../../screens/MyCompanies/";
import MyNews from "../../screens/MyNews/";
export default createMaterialBottomTabNavigator({
  "My Consultants": MyConsultants,
  "My News": MyNews,
  "My Companies": MyCompanies
},
  {
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
);
