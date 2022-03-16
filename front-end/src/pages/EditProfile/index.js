import React from "react"
import { Link, useNavigate } from "react-router-dom";

//Icons
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

//Components
import Main from "../../components/Main";
import Header from "../../components/Header";
import FadeIn from "../../components/FadeIn";
import Container from "../../components/Container";
import Subtittle from "../../components/Subtittle";
import UpdateProfile from "../../components/UpdateProfile";
import UpdatePassword from "../../components/UpdatePassword";

//SVG
import logo from "../../images/Xnote.svg";

//LocalStorage
const TOKEN = "@Token-Xnote";
const USER = "@User-Xnote";

const EditProfile = () => {

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
                <Header>
                    <Link to="/app">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Container display="flex" alignItems="center">
                        <Subtittle size={20} weight={400}>{user.name}</Subtittle>
                        <Link to="/edit">
                            <CgProfile size={50} color="white" style={{ marginLeft: "10px" }} />
                        </Link>
                        <MdLogout size={30} color="white" style={{ marginLeft: "30px", cursor: "pointer" }} onClick={logout} />
                    </Container>
                </Header>
            </FadeIn>
            <Container display="flex" direction="column" alignItems="center" justify="center" style={{height: "100vh"}}>
                <UpdateProfile />
                <UpdatePassword />
            </Container>
        </Main >
    )
}

export default EditProfile;