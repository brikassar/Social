import {
  applyMiddleware,
  combineReducers, compose,
  legacy_createStore as createStore,
} from 'redux';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';
import thunkMiddleware from 'redux-thunk';
import AppReducer from "./AppReducer";



let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer, 
  auth: authReducer,
  app: AppReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
//ReturnType special function. Returning types from RootReducerType
let state: AppStateType;


// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware)
));


// @ts-ignore
window.__store__ = store;
//ru:Вспомогательный метод, необходимый нам для того, чтобы выводить сторе в консоли.
//eng: Method witch made store visible in console

export default store;
