import {
    Navigation,
    NAVIGATION_PADDING,
} from 'src/components/global/navigation/navigation'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Index} from 'src/pages/Index'
import clsx from 'clsx'

export const App = () => (
    <div className={clsx(NAVIGATION_PADDING, 'bg-gray-100 min-h-screen')}>
        <BrowserRouter>
            <Navigation />
            <div className={'container bg-gray-200 min-h-screen'}>
                <Switch>
                    <Route exact path="/" component={Index} />
                </Switch>
            </div>
        </BrowserRouter>
    </div>
)
