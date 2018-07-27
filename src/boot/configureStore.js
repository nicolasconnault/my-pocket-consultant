import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from '../reducers'
import {
  setDeviceSize,
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

  return store
}
