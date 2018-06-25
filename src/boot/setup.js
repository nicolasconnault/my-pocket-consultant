import * as Expo from 'expo'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import App from '../App'
import configureStore from './configureStore'

export default class Setup extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false })),
      // store: configureStore(() => this.setState({ isLoading: false })).store,
      // persistor: configureStore(() => this.setState({ isLoading: false })).persistor,
      isReady: false,
    }
  }

  state: {
    store: Object,
    isLoading: boolean,
    isReady: boolean
  }

  componentWillMount() {
    this.loadFonts()
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    })

    this.setState({ isReady: true })
  }

  render() {
    const { isReady, isLoading, store } = this.state
    if (!isReady || isLoading) {
      return <Expo.AppLoading />
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
