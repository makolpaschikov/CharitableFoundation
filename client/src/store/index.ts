import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from 'src/store/user'
import logger from 'redux-logger'
import {notificationsReducer} from 'src/store/notifications/reducer'
import {productsReducer} from 'src/store/products'

export function createStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            notifications: notificationsReducer,
            products: productsReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
    })
}

export type AppState = ReturnType<ReturnType<typeof createStore>['getState']>
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
