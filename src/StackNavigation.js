import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";

import Notifications from "./screens/Customer/Notifications/";
import MyConsultants from "./screens/Customer/MyConsultants/";
import MyCompanies from "./screens/Customer/MyCompanies/";
import MyNews from "./screens/Customer/MyNews/";
import CustomerSettings from "./screens/Customer/Settings/";
import CustomerHelp from "./screens/Customer/Help/";
import SelectAConsultant from "./screens/Customer/SelectAConsultant/";
import CustomerDrawer from './CustomerDrawer.js'
import ConsultantDrawer from './ConsultantDrawer.js'

import Customers from "./screens/Consultant/Customers/";
import Customer from "./screens/Consultant/Customers/Customer/";
import Notes from "./screens/Consultant/Customers/Notes/";
import NewNote from "./screens/Consultant/Customers/NewNote/";

import Subscriptions from "./screens/Consultant/Subscriptions/";
import Details from "./screens/Consultant/Subscriptions/Details/";
import Profile from "./screens/Consultant/Subscriptions/Profile/";
import News from "./screens/Consultant/Subscriptions/News/";
import EditNews from "./screens/Consultant/Subscriptions/News/Edit/";
import NewNews from "./screens/Consultant/Subscriptions/News/New/";
import Tutorials from "./screens/Consultant/Subscriptions/Tutorials/";
import EditTutorial from "./screens/Consultant/Subscriptions/Tutorials/Edit/";
import NewTutorial from "./screens/Consultant/Subscriptions/Tutorials/New/";

import TodoList from "./screens/Consultant/TodoList/";
import ConsultantSettings from "./screens/Consultant/Settings/";
import ConsultantHelp from "./screens/Consultant/Help/";
import Terms from "./screens/Consultant/Terms/";

export default class StackNavigation extends React.Component {
    render() {
        const Navigator = createStackNavigator({
            Drawer: { screen: (this.props.drawer == 'customer') ? CustomerDrawer : ConsultantDrawer },
            MyCompanies: { screen: MyCompanies },
            MyNews: { screen: MyNews },
            SelectAConsultant: { screen: SelectAConsultant },
          }, {
            initialRouteName: 'Drawer',
            headerMode: 'none',
        })
        return (
            <Navigator />
        )
    }
}
