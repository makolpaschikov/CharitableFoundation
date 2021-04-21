import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Index} from 'src/pages/Index'

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index} />
        </Switch>
    </BrowserRouter>
)
