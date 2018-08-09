import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Welcome from './components/welcome';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import Signout from './components/auth/signout';
import SignIn from './components/auth/signin';
import reducers from './reducers';

const store = createStore(
    reducers,
    {
        auth: { authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Welcome} />
                <Route path="/signup" component={SignUp} />
                <Route path="/feature" component={Feature} />
                <Route path="/signout" component={Signout} />
                <Route path="/signin" component={SignIn} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);