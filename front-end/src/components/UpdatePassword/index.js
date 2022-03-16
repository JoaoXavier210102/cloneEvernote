import React, { useState } from "react";
import styled from "styled-components";
import json from "../../config/colors.json";
import Swal from "sweetalert2"
import api from "../../services/api";

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

const TOKEN = "@Token-Xnote";

const UpdatePassword = () => {

    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();



        if (!password || !confirmPassword) {
            Swal.fire({
                icon: "warning",
                title: "Ops...",
                text: "Empty fields"
            })
        } else {
            if (password === confirmPassword) {
                Swal.fire({
                    title: 'Are you sure?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#00B856',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, change password!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        setLoading(true)

                        api.put("users/profile/password", {
                            password
                        }, {
                            headers: { "x-access-token": localStorage.getItem(TOKEN) }
                        }).then((response) => {
                            Swal.fire({
                                icon: "success",
                                text: response.data.message
                            })
                            setLoading(false)
                        }).catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                title: error.response.data.message
                            })
                            setLoading(false)
                        });
                    }
                })

            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Ops...",
                    text: "Different passwords"
                })
            }
        }


    }

    return (
        <div style={{ marginTop: "20px" }}>
            <Subtittle>Change Password</Subtittle>
            <Content>
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    <Button justify="right" type="submit" disabled={loading}>Change</Button>
                </Form>
            </Content>
        </div>
    )
}

export default UpdatePassword;