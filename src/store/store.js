import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootreducer';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

// this caused an error and above is the fix
// const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(
  rootReducer,
//   middleware,
//   //for dev tools use dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
