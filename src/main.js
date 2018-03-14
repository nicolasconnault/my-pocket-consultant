import React from 'react';
import { View, ScrollView } from 'react-native';
import { Toolbar, Subheader } from 'react-native-material-ui';
import Nav from './bottom_navigation.js';
import uiTheme from './uitheme.js';
import Menu from './menu.js';

export default class Main extends React.Component {
  state = { menuVisible: false };

  render() {
    return (
        <View>
            <View style={{ backgroundColor: uiTheme.palette.primaryColor, height: 30, flex: 1, alignSelf: 'stretch', position: 'absolute', top: 0, right: 0, left: 0 }} >
            </View>
            <View style={{ position: 'absolute', top: 24, flex: 1, alignSelf: 'stretch', right: 0, left: 0 }}>
                <Toolbar
                    leftElement="menu"
                    centerElement="Home"
                    searchable={{
                      autoFocus: true,
                      placeholder: 'Search'
                    }}
                />
            </View>
            <ScrollView style={{ top: 70 }}>
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
              <Subheader text="Subheader text" />
            </ScrollView>
            <View style={{position: 'absolute', bottom: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0}}>
                <Nav />
            </View>
        </View>
    );
  }
}
