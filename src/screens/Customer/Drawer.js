import React from "react"
import { connect } from 'react-redux'
import { Button, Text, View, ScrollView, StyleSheet } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'

class Drawer extends React.Component {
    switchToConsultant() {
        this.props.dispatch({ type: 'select_app_mode', mode: 'consultant' })
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
                <Button onPress={() => this.switchToConsultant()} title="Switch to Consultant" />
              </View>
              <DrawerItems {...props} />
            </SafeAreaView>
          </ScrollView>
        );
    }
}

export default connect()(Drawer)
