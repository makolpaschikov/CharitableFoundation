import {ComponentType} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router'
import {RetryUserLoading} from 'src/components/shared/RetryUserLoading'
import {Spinner} from 'src/components/shared/Spinner'
import {AppDispatch, AppState} from 'src/store'
import {loadUser} from 'src/store/user'
import {LoadingStatus} from 'src/util/loading-status'

export const authorized = (Component: ComponentType) => {
    return () => {
        const dispatch = useDispatch<AppDispatch>()
        const user = useSelector((state: AppState) => state.user)

        switch (user.status) {
            case LoadingStatus.NONE:
            case LoadingStatus.PENDING:
                return <Spinner />
            case LoadingStatus.ERROR:
            case LoadingStatus.RETRYING:
                return (
                    <RetryUserLoading
                        retry={() => dispatch(loadUser())}
                        retrying={user.status === LoadingStatus.RETRYING}
                    />
                )
            case LoadingStatus.SUCCESS: {
                if (user) {
                    return <Component />
                } else {
                    return <Redirect to={'/login'} />
                }
            }
        }
    }
}
