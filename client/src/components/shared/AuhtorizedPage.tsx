import {ComponentType} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router'
import {RetryLoading} from 'src/components/shared/RetryLoading'
import {Spinner} from 'src/components/shared/Spinner'
import {AppDispatch, AppState} from 'src/store'
import {loadUser} from 'src/store/user'
import {LoadingStatus} from 'src/util/loading-status'

export const authorized = (Component: ComponentType) => {
    return () => {
        const dispatch = useDispatch<AppDispatch>()
        const user = useSelector((state: AppState) => state.user)
        console.log('AAAAA', user)

        switch (user.status) {
            case LoadingStatus.NONE:
            case LoadingStatus.PENDING:
                return <Spinner />
            case LoadingStatus.ERROR:
            case LoadingStatus.RETRYING:
                return (
                    <RetryLoading
                        retry={() => dispatch(loadUser())}
                        retrying={user.status === LoadingStatus.RETRYING}
                        message={
                            'Не удалось загрузить информацию о текущем пользователе. Попробуйте ещё раз позже.'
                        }
                    />
                )
            case LoadingStatus.SUCCESS: {
                if (user.user) {
                    return <Component />
                } else {
                    return <Redirect to={'/login'} />
                }
            }
        }
    }
}
