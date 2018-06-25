import React from 'react'
import {
  Button, Text, View, ScrollView, StyleSheet,
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={{ alignSelf: 'flex-end' }}>
        <Button onPress={() => this.props.navigation.navigate('ConsultantDrawer')} title="Switch to Consultant" />
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CustomDrawerContentComponent
