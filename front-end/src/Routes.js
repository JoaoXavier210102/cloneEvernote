import React from "react";
import {
    BrowserRouter,
    Routes as Switch,
    Route
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./pages/app";

const Routes = () => {

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/app" element={<App />}/>
            </Switch>
        </BrowserRouter>
    )

}

export default Routes;