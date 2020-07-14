import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from './reducers';
import UrlParse from 'url-parse';
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'connected-react-router'

const history = createHashHistory()
const rootReducer = createRootReducer(history)

const reduxMiddlewares =
[
	thunk
];
const urlParser = new UrlParse(window.location.href, true);
const isLogger = urlParser.query.debug || localStorage.log==='1' || 0;

if (process.env.NODE_ENV === 'development' || isLogger)
{
	const reduxLogger = createLogger(
		{
			// filter VOLUME level actions from log
			predicate : (getState, action) => ! (action.type === 'SET_PRODUCER_VOLUME'
				|| action.type === 'SET_CONSUMER_VOLUME'),
			duration  : true,
			timestamp : false,
			level     : 'log',
			logErrors : true
		});

	reduxMiddlewares.push(reduxLogger);
}
const actionCreators = {
	...routerActions
}


const composeEnhancers = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		actionCreators
	}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(...reduxMiddlewares)
	// other store enhancers if any
);
const router = routerMiddleware(history)
reduxMiddlewares.push(router)

export const store = createStore(
	rootReducer,
	undefined,
	enhancer
);
