import React from "react";
import { Link } from "react-router-dom";

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
    return (
        <Main>
            <FadeIn>
                <Header justifyContent="space-around" alignItems="center">
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
                        <Form>
                            <Input placeholder="Name" />
                            <Input placeholder="Email" />
                            <Input placeholder="Password" />
                            <Input placeholder="Confirm Password" />
                            <Button type="submit" size="medium" justify="center" style={{ marginTop: "20px" }}>Register</Button>
                        </Form>
                    </FadeInDown>
                </Container>
            </Container>
        </Main>
    )
}

export default Register;