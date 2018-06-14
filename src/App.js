import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";
import { Text, View } from 'react-native';
import { Root } from "native-base";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { COLOR } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import StackNavigation from './StackNavigation.js'

class App extends Component { 

    render () { 
        this.appMode = 'customer';
        if (this.props.appMode != null) {
            this.appMode = this.props.appMode ;
        }

        return (
          <Root>
            <StackNavigation drawer={this.appMode} />
          </Root>
        )
    }
}

export default App;
