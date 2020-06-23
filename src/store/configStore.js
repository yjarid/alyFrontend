import { createStore, combineReducers } from 'redux';
import tokenReducer from '../reducers/auth';
// import {saveToLocalStorage} from '../utils/saveToLocalStorage'

export default () => {
  const store = createStore(
    combineReducers({
      token: tokenReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  //  store.subscribe(() => saveToLocalStorage(store.getState()))

  return store;
};