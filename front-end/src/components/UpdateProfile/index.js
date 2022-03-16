import React, { useState } from "react";
import styled from "styled-components";
import json from "../../config/colors.json";
import api from "../../services/api";
import Swal from 'sweetalert2'

import Subtittle from "../Subtittle";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Content = styled.div`
    background-color: ${json.secondary};
    padding: 20px;
    border-radius: 25px;
`

const Form = styled.form`
    display: grid;
`

//LocalStorage
const TOKEN = "@Token-Xnote";
const USER = "@User-Xnote";

const UpdateProfile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name && email !== "") {
            api.put("users/profile/email", {
                email
            }, {
                headers: { "x-access-token": localStorage.getItem(TOKEN) }
            }).then((response) => {

                let user = JSON.parse(localStorage.getItem(USER));
                user.email = response.data.email;
                localStorage.setItem(USER, JSON.stringify(user));
                localStorage.setItem(TOKEN, response.data.token);

                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                })

            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
        } else if (!email && name !== "") {
            api.put("users/profile/name", {
                name
            }, {
                headers: { "x-access-token": localStorage.getItem(TOKEN) }
            }).then((response) => {
                let user = JSON.parse(localStorage.getItem(USER));
                user.name = response.data.name;
                localStorage.setItem(USER, JSON.stringify(user));

                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                })

            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
        } else if (email !== "" && name !== "") {
            api.put("/users/profile", {
                name,
                email
            }, {
                headers: { "x-access-token": localStorage.getItem(TOKEN) }
            }).then((response) => {
                let user = JSON.parse(localStorage.getItem(USER));
                user.email = response.data.email;
                user.name = response.data.name;
                localStorage.setItem(USER, JSON.stringify(user));
                localStorage.setItem(TOKEN, response.data.token);

                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                })
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: "Ops...",
                text: "Empty Fields"
            })
        }

    }

    return (
        <div>
            <Subtittle>Personal Information</Subtittle>
            <Content>
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Name"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Button justify="right" type="submit">Update</Button>
                </Form>
            </Content>
        </div>
    )
}

export default UpdateProfile;