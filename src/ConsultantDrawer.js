import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import Customers from './screens/Consultant/Customers'

import Subscriptions from './screens/Consultant/Subscriptions'
import News from './screens/Consultant/Subscriptions/News'

import TodoList from './screens/Consultant/TodoList'
import Settings from './screens/Consultant/Settings'
import Help from './screens/Consultant/Help'
import Terms from './screens/Consultant/Terms'

import Drawer from './screens/Consultant/Drawer'

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
  contentComponent: props => <Drawer {...props} />,
})
