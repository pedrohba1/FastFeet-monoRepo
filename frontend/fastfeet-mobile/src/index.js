import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import * as React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from '~/routes';

import { store, persistor } from './store';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
                <Routes />
            </PersistGate>
        </Provider>
    );
}

export default App;
