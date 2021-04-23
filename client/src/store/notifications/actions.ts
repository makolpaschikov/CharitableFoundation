import {AppDispatch} from 'src/store'
import {
    addNotification,
    removeNotification,
} from 'src/store/notifications/reducer'
import {NotificationType} from 'src/store/notifications/types'

const getId = () => Math.floor(Math.random() * 1000000)

export const showNotification = (type: NotificationType, text: string) => (
    dispatch: AppDispatch
) => {
    const id = getId()

    dispatch(addNotification({type, text, id}))
    setTimeout(() => {
        dispatch(removeNotification(id))
    }, 10_000)
}

export const showErrorNotification = (text: string) =>
    showNotification(NotificationType.ERROR, text)
export const showInfoNotification = (text: string) =>
    showNotification(NotificationType.INFO, text)
