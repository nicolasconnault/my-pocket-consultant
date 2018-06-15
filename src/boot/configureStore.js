import { AsyncStorage } from "react-native";
import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import reducers from "../reducers";
import { fetchCompanies } from "../actions/companyActions"

export default function configureStore(onCompletion: () => void): any {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: "nativestarterpro",
      realtime: true
    })
  );

  let store = createStore(reducers, enhancer);
  // persistStore(store, { storage: AsyncStorage }, onCompletion);
  store.dispatch(fetchCompanies())
  return store;
}

