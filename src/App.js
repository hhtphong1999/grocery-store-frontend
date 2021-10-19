import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as CONFIG from './constants/config';

import AdminPrivateRoute from "./AdminPrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "./components/admin/Login";
import NotFound from "./components/errors/NotFound";

axios.defaults.baseURL = CONFIG.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <AdminPrivateRoute path="/admin" name="Admin" />
                    <Login path="/admin-login" name="AdminLogin" />
                    <NotFound path="/404" name="NotFound" />
                    <PublicRoute path="/" name="Home" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
