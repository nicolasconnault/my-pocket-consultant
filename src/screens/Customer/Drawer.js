import React from 'react'
import { connect } from 'react-redux'
import {
  Button, View, ScrollView, StyleSheet,
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import changeAppMode from '../../actions/appModeActions'

class Drawer extends React.Component {
  switchToConsultant() {
    const { dispatch } = this.props
    dispatch(changeAppMode('consultant'))
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
    })
    const props = this.props
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{ alignSelf: 'flex-end' }}>
            <Button onPress={() => this.switchToConsultant()} title="Switch to Consultant" />
          </View>
          <DrawerItems {...props} />
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default connect()(Drawer)
