import { AsyncStorage } from "react-native";
import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import reducers from "../reducers";
import { fetchCustomerCompanies } from "../actions/companyActions"
import { fetchConsultants } from "../actions/consultantActions"

const persistConfig = {
key: 'root',
storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default function configureStore(onCompletion: () => void): any {

  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: "nativestarterpro",
      realtime: true
    })
  );

  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store)
  store.dispatch(fetchCustomerCompanies())
  store.dispatch(fetchConsultants())
  return { store, persistor };
}

