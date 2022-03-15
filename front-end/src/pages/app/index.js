import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';


//Icons
import { CgProfile, CgMenuGridR } from "react-icons/cg";
import { MdLogout, MdSave } from "react-icons/md";
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
import Saving from "../../components/Saving";

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
    const [noteId, setNoteId] = useState("");
    const [reload, setReload] = useState(false);
    const [currentContent, setCurrentContent] = useState("");
    const [timer, setTimer] = useState(null);
    const [saving, setSaving] = useState(false);

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

    const handleSaveEditor = (current, delta, user) => {

        setCurrentContent(current);
        clearTimeout(timer);
        user === "user" && setSaving(true);

        if (user === "user") {
            setTimer(setTimeout(() => {
                api.put(`/notes/${noteId}`, {
                    body: current
                }, {
                    headers: { "x-access-token": localStorage.getItem(TOKEN) }
                }).then((response) => {
                    setSaving(false);
                    setReload(!reload);
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                });
            }, 1500))
        }

    }

    useEffect(() => {

        api.get("/notes", { headers: { "x-access-token": localStorage.getItem(TOKEN) } }).then((response) => {
            setNotes(response.data);
            if (response.data.length > 0) {
                setNoteId(response.data[0]._id)
                setCurrentContent(response.data[0].body);
            }
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
        <>
            <Main style={{ background: "white" }}>
                <FadeIn>
                    <Header position="relative" style={{ background: "linear-gradient(116.42deg, #3C1642 23.33%, #086375 83.22%)" }}>
                        <Saving active={saving} />
                        <CgMenuGridR size={30} color="white" onClick={handleSideBar} style={{ position: "absolute", left: "20px", cursor: "pointer" }} />
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
                <FadeIn>
                    <Container style={{ width: "500px", display: "grid", transition: "1s", position: "fixed", left: openMenu ? "0px" : "-500px", background: "linear-gradient(0deg, rgba(8,99,117,1) 0%, rgba(60,22,66,1) 100%)" }}>
                        <Container fullWidth display="flex" justify="center" style={{ marginBottom: "60px" }}>
                            <Search result={(result) => result.length === 0 ? setReload(!reload) : setNotes(result)}/>
                        </Container>
                        <Container display="flex" justify="space-between">
                            <Subtittle size={18} weight={400} style={{ marginLeft: "10px" }}>{notes.length <= 1 ? `${notes.length} Note` : `${notes.length} Notes`}</Subtittle>
                            <IoAddCircle size={30} color="white" style={{ cursor: "pointer", marginRight: "10px" }} onClick={handleAddNote} />
                        </Container>
                        <ListNotes>
                            {notes.map((note) => (
                                <Note
                                    key={note._id}
                                    title={note.title}
                                    body={note.body}
                                    onDelete={() => handleDeleteNote(note._id)}
                                    onClickNote={() => {
                                        if (!saving) {
                                            setNoteId(note._id)
                                            setCurrentContent(note.body)
                                        }
                                    }}
                                    selected={noteId === note._id ? true : false}
                                />
                            ))}
                        </ListNotes>
                    </Container>
                </FadeIn>
                <Container>
                    <ReactQuill modules={modules} theme="snow" value={currentContent} onChange={handleSaveEditor} placeholder="Try to type something..." style={{ marginLeft: openMenu ? "500px" : "0px", transition: "1s", height: "calc(100vh - 128px)" }} />
                </Container>
            </Main >
        </>
    )
}

export default App;