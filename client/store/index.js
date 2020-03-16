import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import challenge from './challenge';
import result from './result';
import challenges from './challenges';
import userBest from './userbest';

const reducer = combineReducers({
  user,
  challenge,
  challenges,
  result,
  userBest
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './challenge';
export * from './result';
export * from './challenges';
export * from './userbest';
