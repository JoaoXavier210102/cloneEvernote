import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import api from "../../services/api";

//Components
import Main from "../../components/Main";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Tittle from "../../components/Tittle";
import Form from "../../components/Form";

//SVG
import logo from "../../images/Xnote.svg";

const TOKEN = "@Token-Xnote";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Empty fields!"
            })
        } else {
            api.post("/users/login", { email, password }).then((response) => {
                localStorage.setItem(TOKEN, response.data.token);
                navigate("/app");
            }).catch((error) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: error.response.data.message
                })
            })
        }
    }

    return (
        <>
            <Main>
                <Header justifyContent="space-around" alignItems="center">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Link to="/register">
                        <Button>Register</Button>
                    </Link>
                </Header>
                <Container display="grid" height="100%" justify="center">
                    <Container>
                        <Tittle align="center" size={64}>Access account</Tittle>
                        <Form onSubmit={handleSubmit}>
                            <Input placeholder="Email" type="email" onChange={(event => setEmail(event.target.value))} />
                            <Input placeholder="Password" type="password" onChange={(event => setPassword(event.target.value))} />
                            <Button type="submit" size="medium" justify="center" style={{ marginTop: "20px" }}>Login</Button>
                        </Form>
                    </Container>
                </Container>
            </Main>
        </>
    )
}

export default Login;