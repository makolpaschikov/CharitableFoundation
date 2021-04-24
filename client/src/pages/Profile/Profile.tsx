import {authorized} from 'src/components/shared/AuhtorizedPage'

export const Profile = authorized(() => {
    return <div>Пользователь авторизован</div>
})
