import * as Expo from "expo"
import React, { Component } from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from 'react-native-material-ui'
import { PersistGate } from 'redux-persist/integration/react'

import uiTheme from '../uitheme.js'
import App from "../App.js"
import configureStore from "./configureStore.js"

export default class Setup extends Component {
  state: {
    store: Object,
    isLoading: boolean,
    isReady: boolean
  }
  constructor() {
    super()
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false })).store,
      persistor: configureStore(() => this.setState({ isLoading: false })).persistor,
      isReady: false
    }
  }
  componentWillMount() {
    this.loadFonts()
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })

    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady || this.state.isLoading) {
      return <Expo.AppLoading />
    }
    return (
        <Provider store={this.state.store}>
          <PersistGate loading={null} persistor={this.state.persistor}>
            <ThemeProvider uiTheme={uiTheme}>
                <App />
            </ThemeProvider>
          </PersistGate>
        </Provider>
    )
  }
}

