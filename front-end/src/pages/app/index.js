import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

//Icons
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

//Components
import Main from "../../components/Main";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Subtittle from "../../components/Subtittle";
import ListNotes from "../../components/ListNotes";
import Search from "../../components/Search";
import Note from "../../components/Note";

//Animation
import FadeIn from "../../components/FadeIn";
import FadeInDown from "../../components/FadeInDown";

//SVG
import logo from "../../images/Xnote.svg";

//LocalStorage
const TOKEN = "@Token-Xnote";
const USER = "@User-Xnote";

const App = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem(USER));

    const logout = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER);
        navigate("/");
    }

    return (
        <Main>
            <FadeIn>
                <Header position="relative">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Container display="flex" alignItems="center">
                        <Subtittle size={20} weight={400}>{user.name}</Subtittle>
                        <Link to="#">
                            <CgProfile size={50} color="white" style={{ marginLeft: "10px" }} />
                        </Link>
                        <MdLogout size={30} color="white" style={{ marginLeft: "30px", cursor: "pointer" }} onClick={logout} />
                    </Container>
                </Header>
            </FadeIn>
            <FadeInDown>
                <div>
                    <Container style={{ width: "500px" }} >
                        <Container fullWidth display="flex" justify="center">
                            <Search />
                        </Container>
                        <Subtittle size={18} weight={400} style={{ marginLeft: "10px" }}>4 Notes</Subtittle>
                        <ListNotes>
                            <Note selected/>
                        </ListNotes>
                    </Container>
                </div>
            </FadeInDown>
        </Main >
    )
}

export default App;