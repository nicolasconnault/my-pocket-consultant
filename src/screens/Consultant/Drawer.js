import React, { Component } from "react";
import { Button, Text, View, ScrollView, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

class Drawer extends React.Component {
    switchToCustomer() {
        this.props.dispatch({ type: 'select_app_mode', mode: 'customer' })
    }

    render() { 
        const styles = StyleSheet.create({
          container: {
            flex: 1,
          },
        });
        let props = this.props
        return (
            <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={{ alignSelf: 'flex-end' }}>
                <Button onPress={() => this.switchToCustomer()} title="Switch to Customer" />
              </View>
              <DrawerItems {...props} />
            </SafeAreaView>
          </ScrollView>
        );
    }
}
export default Drawer
