import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login';

import Couriers from '../pages/Couriers';
import Packages from '../pages/Packages';
import Problems from '../pages/Problems';
import Recipients from '../pages/Recipients';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/couriers" isPrivate component={Couriers} />
            <Route path="/packages" isPrivate component={Packages} />
            <Route path="/problems" isPrivate component={Problems} />
            <Route path="/recipients" isPrivate component={Recipients} />
        </Switch>
    );
}
