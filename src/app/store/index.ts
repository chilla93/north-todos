import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import reducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger'

import sagas from "./sagas";
import { RouterState, routerMiddleware, connectRouter } from "connected-react-router";
import { IAppState } from 'src/app/store/reducer';
import { createBrowserHistory } from "history";


//Actions must be plain objects. Use custom middleware for async actions.
const customActionMiddleware = () => (next: any) => (action: any) => next({ ...action });

// Create a history of your choosing (we're using a browser history in this case)
const browserHistory = createBrowserHistory();

const routeMiddleware  = routerMiddleware(browserHistory)

const sagaMiddleware = createSagaMiddleware();


let composeEnhancers = compose;

if (process.env.NODE_ENV === "development") {
  const composeWithDevToolsExtension = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (typeof composeWithDevToolsExtension === "function") {
    composeEnhancers = composeWithDevToolsExtension;
  }
}

// const loggerMiddleware = (process.env.NODE_ENV === "development") ? logger : undefined;
let middleWares: any;

if((process.env.NODE_ENV === "development")){
  middleWares = composeEnhancers(
    applyMiddleware(sagaMiddleware, routeMiddleware, customActionMiddleware, logger)
  )
}
else{
  middleWares = composeEnhancers(
    applyMiddleware(sagaMiddleware, routeMiddleware, customActionMiddleware)
  )
}

const appReducers = combineReducers({
  app: reducer,
  router: connectRouter(browserHistory)
})

export interface IRootState {
  app: IAppState,
  routing: RouterState
}

const store = createStore(
  appReducers, // new root reducer with router state
  middleWares
);

sagaMiddleware.run(sagas);

export default store;
export {browserHistory}
