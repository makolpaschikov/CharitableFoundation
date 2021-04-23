import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {App} from 'src/pages/App'
import {createStore} from 'src/store'

const store = createStore()

export const AppContainer = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
