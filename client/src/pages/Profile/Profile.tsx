import clsx from 'clsx'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {authorized} from 'src/components/shared/AuhtorizedPage'
import {Catalog} from 'src/pages/Catalog'
import {showInfoNotification} from 'src/store/notifications/actions'
import {logout} from 'src/store/user'
import {ENDPOINTS} from 'src/util/api'

export const Profile = authorized(() => {
    const dispatch = useDispatch()

    return (
        <div className={'px-8 pt-8'}>
            <h1 className={'text-xl font-bold mb-4'}>Мои товары</h1>
            <div className={'mb-6'}>
                <Link
                    className={
                        'bg-primary-light py-4 px-8 text-white rounded-lg flex-1 mr-2'
                    }
                    to={'/add-product'}
                >
                    Предложить товар
                </Link>
                <Link
                    className={clsx(
                        'border-1 border-primary-dark rounded-lg py-4 px-8 flex-1',
                        'hover:bg-gray-100 activ:bg-gray-200 text-center'
                    )}
                    to={'/'}
                    onClick={() => {
                        fetch(ENDPOINTS.logout, {
                            method: 'POST',
                            credentials: 'include',
                        })
                        dispatch(logout())
                        dispatch(showInfoNotification('Вы вышли из аккаунта'))
                    }}
                >
                    Выйти
                </Link>
            </div>
            <Catalog my />
        </div>
    )
})
