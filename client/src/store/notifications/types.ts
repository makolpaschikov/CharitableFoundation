export enum NotificationType {
    ERROR = 'error',
    INFO = 'info',
}

export type Notification = {
    id: number
    type: NotificationType
    text: string
}

export type NotificationsState = Notification[]
