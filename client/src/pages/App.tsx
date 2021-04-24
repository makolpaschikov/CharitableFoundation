import {
    Navigation,
    NAVIGATION_PADDING,
} from 'src/components/global/navigation/navigation'
import {Route, Switch} from 'react-router-dom'
import {Index} from 'src/pages/Index'
import clsx from 'clsx'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, AppState} from 'src/store'
import {loadUser} from 'src/store/user'
import {LoadingStatus} from 'src/util/loading-status'
import {showErrorNotification} from 'src/store/notifications/actions'
import {Notifications} from 'src/components/global/notifications/notifications'
import {Registration} from 'src/pages/Registration/Registration'

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector((state: AppState) => state.user)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    useEffect(() => {
        if (userState.status === LoadingStatus.ERROR) {
            dispatch(showErrorNotification(userState.error))
        }
    }, [dispatch, userState])

    return (
        <div className={clsx(NAVIGATION_PADDING, 'bg-white min-h-screen')}>
            <Navigation />
            <div
                className={
                    'container bg-background min-h-screen overflow-hidden'
                }
            >
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/register" component={Registration} />
                </Switch>
            </div>
            <Notifications />
        </div>
    )
}
