import React, { Component } from 'react';
import { createDrawerNavigator } from "react-navigation";

import Customers from "./screens/Consultant/Customers/";

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
import Settings from "./screens/Consultant/Settings/";
import Help from "./screens/Consultant/Help/";
import Terms from "./screens/Consultant/Terms/";

import Drawer from "./screens/Consultant/Drawer.js";

export default createDrawerNavigator({
    TodoList: { screen: TodoList },
    Subscriptions: { screen: Subscriptions },
    Customers: { screen: Customers },
    News: { screen: News },
    Settings: { screen: Settings },
    Help: { screen: Help },
    Terms: { screen: Terms },
}, {
    initialRouteName: 'TodoList',
    contentComponent: props => <Drawer {...props} />
})
