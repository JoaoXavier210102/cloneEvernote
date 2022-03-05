import React from "react";
import { Link } from "react-router-dom";

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

//Animation
import FadeIn from "../../components/FadeIn";

//SVG
import logo from "../../images/Xnote.svg";

const App = () => {

    const logout = () => {

    }

    return (
        <Main>
            <FadeIn>
                <Header position="relative">
                    <Link to="#">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Container display="flex" alignItems="center">
                        <Subtittle size={20} weight={400}>João Xavier</Subtittle>
                        <Link to="#">
                            <CgProfile size={50} color="white" style={{ marginLeft: "10px" }} />
                        </Link>
                        <MdLogout size={30} color="white" style={{ marginLeft: "30px", cursor: "pointer" }} onClick={logout} />
                    </Container>
                </Header>
            </FadeIn>
            <ListNotes>
                <Search />
            </ListNotes>
        </Main>
    )
}

export default App;