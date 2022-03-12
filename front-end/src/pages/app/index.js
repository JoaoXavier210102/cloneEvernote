import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


//Icons
import { CgProfile, CgMenuGridR } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

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
const SIDEBAR = "@Sidebar-Xnote";

const App = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem(USER));
    const [openMenu, setOpenMenu] = useState(JSON.parse(localStorage.getItem(SIDEBAR)) || false);
    const [notes, setNotes] = useState([]);
    const [reload, setReload] = useState(false);
    const [valueEditor, setValueEditor] = useState("");

    const modules = {
        toolbar: [
            [{ 'header': [] }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', { 'script': 'super' }, { 'script': 'sub' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
        history: {
            delay: 3000,
        }
    }

    const logout = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER);
        navigate("/");
    }

    const handleSideBar = () => {
        setOpenMenu(!openMenu)
        localStorage.setItem(SIDEBAR, JSON.stringify(!openMenu))
    }

    const handleDeleteNote = (noteId) => {
        api.delete(`/notes/${noteId}`, { headers: { "x-access-token": localStorage.getItem(TOKEN) } }).then((response) => {
            Swal.fire({
                icon: 'success',
                title: response.data.message
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            })
        })

        setReload(!reload);
    }

    const handleAddNote = async () => {

        const { value: formValues } = await Swal.fire({
            title: "Add Note :D",
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Body">',
            preConfirm: () => {
                return {
                    title: document.getElementById('swal-input1').value,
                    body: document.getElementById('swal-input2').value
                }
            }
        })


        if (formValues.title && formValues.body) {
            api.post("/notes/create", {
                title: formValues.title,
                body: formValues.body
            }, {
                headers: { "x-access-token": localStorage.getItem(TOKEN) }
            }).then(() => {
                setReload(!reload);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                })
            })
        }
    }

    const handleEditor = (value) => {
        console.log(value);
    }

    useEffect(() => {

        api.get("/notes", { headers: { "x-access-token": localStorage.getItem(TOKEN) } }).then((response) => {
            setNotes(response.data);
        }).catch((error) => {
            if (error.response.data.message === "Token invalid") {
                localStorage.removeItem(TOKEN);
                navigate("/login");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                })
            }
        })

    }, [reload]);



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
            <FadeInDown>
                <Container style={{ width: "500px", display: "grid", transition: "1s", position: "fixed", left: openMenu ? "0px" : "-500px" }}>
                    <Container fullWidth display="flex" justify="center" style={{ marginBottom: "60px" }}>
                        <Search />
                    </Container>
                    <Container display="flex" justify="space-between">
                        <Subtittle size={18} weight={400} style={{ marginLeft: "10px" }}>{notes.length <= 1 ? `${notes.length} Note` : `${notes.length} Notes`}</Subtittle>
                        <IoAddCircle size={30} color="white" style={{ cursor: "pointer", marginRight: "10px" }} onClick={handleAddNote} />
                    </Container>
                    <ListNotes>
                        {notes.map((note) => (
                            <Note key={note._id} title={note.title} body={note.body} onDelete={() => handleDeleteNote(note._id)} />
                        ))}
                    </ListNotes>
                </Container>
            </FadeInDown>
            <ReactQuill modules={modules} theme="snow" value={valueEditor} onChange={setValueEditor} placeholder="Try to type something..." style={{ marginLeft: openMenu ? "500px" : "0px", transition: "1s", background: "white" }} />
        </Main >
    )
}

export default App;