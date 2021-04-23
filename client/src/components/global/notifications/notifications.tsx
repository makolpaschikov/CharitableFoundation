import clsx from 'clsx'
import {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, AppState} from 'src/store'
import {removeNotification} from 'src/store/notifications/reducer'
import {NotificationType, Notification} from 'src/store/notifications/types'

const NotificationView: FC<{notification: Notification}> = ({
    notification: {type, text, id},
}) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div
            className={clsx(
                'rounded-md text-white px-8 py-4 w-64 min-w-sm mt-4 relative',
                type === NotificationType.ERROR
                    ? 'bg-red-600'
                    : 'bg-primary-default'
            )}
        >
            <button
                onClick={() => dispatch(removeNotification(id))}
                className={
                    'absolute w-4 h-4 leading-4 top-2 right-2 text-2xl reset-outline ' +
                    'text-gray-200 hover:text-gray-100 active:text-gray-400'
                }
            >
                &times;
            </button>
            {text}
        </div>
    )
}

export const Notifications = () => {
    const notifications = useSelector((state: AppState) => state.notifications)

    return (
        <div className={'fixed bottom-4 right-4 flex flex-col-reverse'}>
            {notifications.map((notification) => (
                <NotificationView
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </div>
    )
}
