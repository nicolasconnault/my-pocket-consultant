import * as Expo from "expo";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import React, { Component } from "react";
import { ThemeProvider } from 'react-native-material-ui';

import uiTheme from '../uitheme.js';
import App from "../App.js";
import appSyncConfig from '../aws-exports';
 
const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authType,
    apiKey: appSyncConfig.apiKey,
  }
});
 
export default class Setup extends Component {
  state: {
    isLoading: boolean,
    isReady: boolean
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady || this.state.isLoading) {
      return <Expo.AppLoading />;
    }

    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <ThemeProvider uiTheme={uiTheme}>
              <App />
          </ThemeProvider>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

