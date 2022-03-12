import React from "react";
import styled from "styled-components";
import json from "../../config/colors.json";
import Container from "../Container";
import Title from "../Tittle";
import Subtittle from "../Subtittle";
import { FiTrash2 } from "react-icons/fi";


const Note = ({selected, title, body, onDelete}) => {
    return (
        <Container style={{ backgroundColor: selected ? "#19B093" : json.primary, padding: "20px", margin: "10px 0px"}} >
            <Title size={23}>{title}</Title>
            <Subtittle size={18} weight={100} color="default">{body}</Subtittle>
            <Container fullWidth display="flex" justify="right">
                <FiTrash2 style={{ cursor: "pointer" }} size={25} onClick={onDelete}/>
            </Container>
        </Container>
    )
}

export default Note;