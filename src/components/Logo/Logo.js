import React from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

const logoImage = require('./images/logo.png')

const Logo = () => (
  <View style={styles.container}>
    <Image resizeMode="contain" style={styles.containerImage} source={logoImage} />
  </View>
)

export default Logo
