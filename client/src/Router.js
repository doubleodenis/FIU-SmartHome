import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
// import PrivateRoute from "./components/PrivateRoute";
// import NavbarComponent from "./components/NavbarComponent";
// import Auth from "./utils/AuthService"

const Router = (props) => {
    return (
        <BrowserRouter>
            <Route path="/" render={() => <Home {...props}/>} />
        </BrowserRouter>
    );
}

export default Router;