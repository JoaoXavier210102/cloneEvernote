import React from "react";
import {
    BrowserRouter,
    Routes as Switch,
    Route,
    Navigate
} from "react-router-dom";

//Rotas
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./pages/app";
import EditProfile from "./pages/EditProfile";

const TOKEN = "@Token-Xnote";

const Routes = () => {

    const PrivateRoute = ({children}) => {

        const token = localStorage.getItem(TOKEN);

        return token ? (
            children
        ) : (
            <Navigate to="/login" />
        )

    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<PrivateRoute> <App /> </PrivateRoute>} />
                <Route path="/edit" element={<PrivateRoute> <EditProfile /> </PrivateRoute>}/>
            </Switch>
        </BrowserRouter>
    )

}

export default Routes;