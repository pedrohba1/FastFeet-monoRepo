import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login';

import Couriers from '~/pages/Couriers';
import Packages from '~/pages/Packages';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';
import RegisterCourier from '~/pages/RegisterCourier';
import EditCourier from '~/pages/EditCourier';
import RegisterRecipient from '~/pages/RegisterRecipient';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/couriers" isPrivate component={Couriers} />
            <Route path="/packages" isPrivate component={Packages} />
            <Route path="/problems" isPrivate component={Problems} />
            <Route path="/recipients" isPrivate component={Recipients} />
            <Route
                path="/register/courier"
                isPrivate
                component={RegisterCourier}
            />
            <Route path="/edit/courier" isPrivate component={EditCourier} />
            <Route
                path="/register/recipient"
                isPrivate
                component={RegisterRecipient}
            />
        </Switch>
    );
}
