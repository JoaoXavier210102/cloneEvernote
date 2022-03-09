import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

//Icons
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";

//Components
import Main from "../../components/Main";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Subtittle from "../../components/Subtittle";
import ListNotes from "../../components/ListNotes";
import Search from "../../components/Search";
import Note from "../../components/Note";
import Floatbutton from "../../components/FloatButton";

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
    const [openMenu, setOpenMenu] = useState("-500px")

    const logout = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER);
        navigate("/");
    }

    const handleSideBar = () => {
        openMenu === "0px" ? setOpenMenu("-500px") : setOpenMenu("0px");
    }

    return (
        <Main>
            <FadeIn>
                <Header position="relative">
                    <Floatbutton> <CgMenuGridR size={30} color="white" onClick={handleSideBar} /> </Floatbutton>
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
            <Container style={{ width: "500px", display: "grid", transition: "1s", position: "fixed", left: openMenu }}>
                <Container fullWidth display="flex" justify="center" style={{ marginBottom: "60px" }}>
                    <Search />
                </Container>
                <Subtittle size={18} weight={400} style={{ marginLeft: "10px" }}>4 Notes</Subtittle>
                <ListNotes>
                    <Note/>
                </ListNotes>
            </Container>
            <div style={{ width: "100vw", height: "calc(100vh - 87px)" }}>
                
            </div>
        </Main >
    )
}

export default App;