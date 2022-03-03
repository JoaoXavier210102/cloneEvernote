import React from "react";
import { Link } from "react-router-dom";

//Components
import Header from "../../components/Header";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Tittle from "../../components/Tittle";
import Subtittle from "../../components/Subtittle";
import Main from "../../components/Main";

//SVG
import logo from "../../images/Xnote.svg";
import typingBro from "../../images/typingBro.svg";

const Home = () => {

    return (
        <Main>
            <Header justifyContent="space-around" alignItems="center">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div>
                    <Link to="/login">
                        <Button variant="outlined">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button style={{ marginLeft: "30px" }}>Register</Button>
                    </Link>
                </div>
            </Header>
            <Container display="flex" justify="space-evenly" height="100%">
                <img src={typingBro} alt="typing bro" />
                <div>
                    <Tittle align="right" color="primary" size={48} >
                        Lorem Ipsum is simply dummy<br />
                        text of the printing.
                    </Tittle>
                    <Subtittle align="right" weight="100" size={32}>
                        Lorem ipsum dolor sit amet, consectetur<br />
                        adipiscing elit, sed do eiusmod<br />
                        tempor incididunt ut labore et dolore.<br />
                    </Subtittle>
                    <Link to="/register">
                        <Button float="right" size="large">Register Now</Button>
                    </Link>
                </div>
            </Container>
        </Main>
    )
};

export default Home;