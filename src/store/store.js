import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import itemReducer from '../reducers/itemreducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(itemReducer, composeEnhancer(applyMiddleware(thunk)))

// this caused an error and above is the fix
// const middleware = applyMiddleware(thunkMiddleware)
// const store = createStore(
//   itemReducer,
//   middleware,
//   //for dev tools use dev tools
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export default store;
