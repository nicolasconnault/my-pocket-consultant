import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Navigator, NativeModule } from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';
import Main from './src/main.js';
import reducers from './src/reducers';
import uiTheme from './src/uitheme.js';

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <ThemeProvider uiTheme={uiTheme}>
        <Main />
      </ThemeProvider>
    </Provider>
  );
};

export default App; 
