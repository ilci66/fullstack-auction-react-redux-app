import { createStore } from 'redux';
import itemReducer from '../reducers/itemreducer';


const store = createStore(
  itemReducer,
  //for dev tools use dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
