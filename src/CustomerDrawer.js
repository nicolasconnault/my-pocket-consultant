import React, { Component } from 'react';
import { createDrawerNavigator } from "react-navigation";

import Notifications from "./screens/Customer/Notifications/";
import MyConsultants from "./screens/Customer/MyConsultants/";
import MyCompanies from "./screens/Customer/MyCompanies/";
import MyNews from "./screens/Customer/MyNews/";
import Settings from "./screens/Customer/Settings/";
import Help from "./screens/Customer/Help/";
import SelectAConsultant from "./screens/Customer/SelectAConsultant/";
import Drawer from "./screens/Customer/Drawer.js";

export default createDrawerNavigator({
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
