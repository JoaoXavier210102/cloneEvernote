import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

//Components
import Main from "../../components/Main";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Tittle from "../../components/Tittle";
import Form from "../../components/Form";

//Animation
import FadeIn from "../../components/FadeIn";
import FadeInDown from "../../components/FadeInDown";

//SVG
import logo from "../../images/Xnote.svg";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Empty fields!"
            })
        } else if (password !== confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Passwords don't match!"
            })
        } else {
            api.post("/users/register", { name, email, password }).then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: `Usuário ${response.data.name} criado!`,
                    text: "Agora faça o login"
                })
                navigate("/login")
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                })
            })
        }
    }

    return (
        <Main>
            <FadeIn>
                <Header>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </Header>
            </FadeIn>
            <Container display="grid" height="100%" justify="center">
                <Container>
                    <FadeInDown duration="1s">
                        <Tittle align="center" size={64}>Create your account</Tittle>
                        <Form onSubmit={handleSubmit}>
                            <Input placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} />
                            <Input placeholder="Email" type="email" onChange={(event) => setEmail(event.target.value)} />
                            <Input placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
                            <Input placeholder="Confirm Password" type="password" onChange={(event) => setConfirmPassword(event.target.value)} />
                            <Button type="submit" size="medium" justify="center" style={{ marginTop: "20px" }}>Register</Button>
                        </Form>
                    </FadeInDown>
                </Container>
            </Container>
        </Main>
    )
}

export default Register;