import {
    Navigation,
    NAVIGATION_PADDING,
} from 'src/components/global/navigation/navigation'
import {Route, Switch} from 'react-router-dom'
import {Index} from 'src/pages/Index'
import clsx from 'clsx'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {AppDispatch} from 'src/store'
import {loadUser} from 'src/store/user'
import {Notifications} from 'src/components/global/notifications/notifications'
import {Registration} from 'src/pages/Registration'
import {Login} from 'src/pages/Login'
import {Profile} from 'src/pages/Profile'
import {Contacts} from 'src/pages/Contacts'
import {AddProduct} from 'src/pages/AddProduct'

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

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
                    <Route exact path="/about" component={Contacts} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/add-product" component={AddProduct} />
                </Switch>
            </div>
            <Notifications />
        </div>
    )
}
