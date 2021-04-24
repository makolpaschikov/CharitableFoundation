import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Notification, NotificationsState} from 'src/store/notifications/types'

const notifications = createSlice({
    name: 'notifications',
    initialState: [] as NotificationsState,
    reducers: {
        addNotification: (state, {payload}: PayloadAction<Notification>) =>
            [...state, payload].slice(-4),
        removeNotification: (state, {payload}: PayloadAction<number>) => {
            return state.filter(({id}) => id !== payload)
        },
    },
})

export const {
    reducer: notificationsReducer,
    actions: {addNotification, removeNotification},
} = notifications
