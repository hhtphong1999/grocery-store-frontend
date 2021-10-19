import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AdminRoutes from '../../routes/AdminRoutes';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MasterLayout = () => {
    
    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">

                <Navbar />

                <Sidebar />

                {/* <!-- Content Wrapper. Contains page content --> */}
                <div className="content-wrapper">
                    <Switch>
                        {
                            AdminRoutes.map((route, idx) => {
                                return (
                                    route.component && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <route.component {...props} />
                                            )}
                                        />
                                    )
                                )
                            })
                        }
                        <Redirect from="/admin" to="/admin/dashboard" />
                    </Switch>
                </div>
                {/* <!-- /.content-wrapper --> */}

                <Footer />

                {/* <!-- Control Sidebar --> */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* <!-- Control sidebar content goes here --> */}
                </aside>
                {/* <!-- /.control-sidebar --> */}
            </div>
            {/* <!-- ./wrapper --> */}
        </div>
    );
}

export default MasterLayout;