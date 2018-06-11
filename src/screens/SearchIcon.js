import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class DrawerIcon extends React.Component {
  render() {
    return (
        <View>
            <MaterialIcons name="menu" />
        </View>
    );
  }
}

