import { AsyncStorage } from 'react-native'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from '../reducers'
import { ACCESS_TOKEN } from '../config'
import {
  fetchCustomerCompanies,
  fetchSubscribedCompanies,
  fetchTutorials,
  fetchNotifications,
  fetchNewsTypes,
  setDeviceSize,
  fetchUser,
} from '../actions'

export default function configureStore(onCompletion: () => void): any {
  let middlewares = [thunk]
  if (__DEV__ === true) {
    // middlewares.push(createLogger({}))
  }
  const enhancer = compose(
    applyMiddleware(...middlewares),
    devTools({
      name: 'nativestarterpro',
      realtime: true,
      suppressConnectErrors: false,
    }),
  )

  const store = createStore(reducers, enhancer)
  store.dispatch(setDeviceSize())

  AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
    // let store = createStore(persistedReducer, enhancer)
    // let persistor = persistStore(store)
    if (token !== null && token.length > 0) {
      store.dispatch(fetchCustomerCompanies(token))
      store.dispatch(fetchSubscribedCompanies(token))
      store.dispatch(fetchTutorials(token))
      store.dispatch(fetchUser(token))
      store.dispatch(fetchNotifications(token))
      store.dispatch(fetchNewsTypes(token))
    }
    // return { store, persistor }
  })
  return store
}
