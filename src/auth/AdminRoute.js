import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '.';

const {user :{role} } = isAuthenticated()

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuthenticated() && role === 1  ? (
        <Component {...props} />
    ): (
        <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
    )} />
);

export default AdminRoute;