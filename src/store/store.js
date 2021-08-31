import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { createReducer } from './reducers';

export function configureAppStore() {
    const sagaMiddleware = createSagaMiddleware();
    const { run: runSaga } = sagaMiddleware;

    // Create the store with saga middleware
    const middlewares = [sagaMiddleware];

    const enhancers = [
        createInjectorsEnhancer({
            createReducer: injectedReducers => createReducer(injectedReducers),
            runSaga,
        }),
    ];

    //.concat(process.env.NODE_ENV !== 'production' ? logger : null)
    return configureStore({
        reducer: createReducer({}),
        middleware: [...getDefaultMiddleware({
            serializableCheck: false,
        }), ...middlewares],
        devTools:
        /* istanbul ignore next line */
            process.env.NODE_ENV !== 'production' ||
            process.env.PUBLIC_URL.length > 0,
        enhancers,
    });

}
