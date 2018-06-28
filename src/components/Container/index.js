import { View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
})

class Container extends Component {
  render() {
    const { children } = this.props
    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }
}

Container.propTypes = propTypes

export default Container
