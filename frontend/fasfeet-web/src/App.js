import React from 'react';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';

import history from './services/history';
import GlobalStyle from './styles/global';
import Routes from './routes';

function App() {
    return (
        <Router history={history}>
            <Routes />
            <GlobalStyle />
        </Router>
    );
}

export default App;
