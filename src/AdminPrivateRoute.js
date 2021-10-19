import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Route, Redirect } from 'react-router';
import swal from 'sweetalert';

import MasterLayout from './layouts/admin/MasterLayout';

function AdminPrivateRoute() {

    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(true);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        axios.get('/api/checkingAuthenticated').then(res => {
            if (isMounted) {
                if (res.status !== 200) {
                    setAuthenticated(false);
                }
            }
            //setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal('Unauthorized', err.response.data.message, 'warning');
            history.push('/admin-login');
        };

        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) {
            swal('Forbiden', error.response.data.msg, 'warning');
            history.push('/404');
        } else if (error.response.status === 404) {
            swal('404 error', 'Page not found', 'warning');
            history.push('/404');
        }

        return Promise.reject(error);
    });

    // if (loading) {
    //     return (
    //         <div className="preloader flex-column justify-content-center align-items-center">
    //             <img className="animation__shake" src="/assets/admin/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
    //         </div>
    //     );
    // };

    return (
        <Route
            render = { ({props, location}) =>
                authenticated ?
                (<MasterLayout {...props} />) :
                (<Redirect to={{ pathname: "/admin-login", state: {from:location} }} />)
            }
        />
    );
}

export default AdminPrivateRoute;