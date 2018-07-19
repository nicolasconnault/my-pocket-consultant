import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  StatusBar,
} from 'react-native'


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

const Loader = (props) => {
  const {
    loading,
    ...attributes
  } = props

  return (
    <Modal
      transparent
      animationType="none"
      visible={loading}
      onRequestClose={() => { console.log('close modal') }}
    >
      <StatusBar hidden />
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
          />
        </View>
      </View>
    </Modal>
  )
}

export default Loader
