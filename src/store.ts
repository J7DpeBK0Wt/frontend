import { applyMiddleware, compose, createStore, DeepPartial, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/reducers';

export type RootReducer = typeof rootReducer;
export type AppState = ReturnType<RootReducer>;

const sagaMiddleware = createSagaMiddleware();

/**
 * Start redux-saga execution loop
 */
export const runSaga = sagaMiddleware.run;

/**
 * Create new Redux store with initial state and configure it
 */
export const configureStore = (initialState: DeepPartial<AppState> = {}): Store<AppState> => {
    const middlewares = [sagaMiddleware];

    const enhancers = [applyMiddleware(...middlewares)];

    // Redux devtools integration
    const composeEnhancers: typeof compose = (
        process.env.NODE_ENV !== 'production' &&
            typeof window === 'object' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ != null ?
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
            compose
    );

    // Create Redux store with reducer, initial state and enhancers
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(...enhancers)
    );

    // Make reducers hot reloadable, see http://mxs.is/googmo
    if (module.hot) {
        module.hot.accept('./modules/reducers', () => {
            const nextRootReducer = (require('./modules/reducers').default as RootReducer);
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};
