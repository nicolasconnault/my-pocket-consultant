import { AsyncStorage } from 'react-native'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import { ACCESS_TOKEN } from '../config'
import { fetchCustomerCompanies } from '../actions/companyActions'
import { fetchConsultants } from '../actions/consultantActions'
import fetchTutorials from '../actions/tutorialActions'
import { fetchUser } from '../actions/authActions'

/*
const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)
*/

export default function configureStore(onCompletion: () => void): any {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: 'nativestarterpro',
      realtime: true,
    }),
  )

  const store = createStore(reducers, enhancer)
  AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
    // let store = createStore(persistedReducer, enhancer)
    // let persistor = persistStore(store)
    if (token !== null && token.length > 0) {
      store.dispatch(fetchCustomerCompanies(token))
      store.dispatch(fetchConsultants(token))
      store.dispatch(fetchTutorials(token))
      store.dispatch(fetchUser(token))
    }
    // return { store, persistor }
  })
  return store
}
