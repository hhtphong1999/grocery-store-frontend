import React from 'react';
import { Route } from 'react-router';

import FrontendLayout from './layouts/frontend/FrontendLayout';

function PublicRoute ({...rest}) {

    return (
        <Route {...rest} render={ (props) => <FrontendLayout {...props} /> } />
    )
}

export default PublicRoute;