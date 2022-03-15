import React, { useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import json from "../../config/colors.json";
import api from "../../services/api";
import Swal from "sweetalert2";

const Input = styled.input`
    box-sizing: border-box;
    font-weight: 100;
    font-size: 20px;
    padding: 10px;
    outline: none;
    border: 3px solid ${json.primary};
`

const Button = styled.button`
    cursor: pointer;
    background-color: ${json.primary};
    border: none;
    padding: 9.5px;
    display:  flex;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    align-items: center;
`

const TOKEN = "@Token-Xnote";

const Search = ({ result }) => {

    const [colorSearch, setColorSearch] = useState("white");
    const [query, setQuery] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.get(`/notes/search`, {
            params: { query },
            headers: { "x-access-token": localStorage.getItem(TOKEN) }
        }).then((response) => {
            result(response.data)
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            })
        })

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="search"
                placeholder="Search"
                onChange={(event) => setQuery(event.target.value)}
            />
            <Button type="submit">
                <BiSearch
                    size={30}
                    color={colorSearch}
                    onMouseLeave={() => setColorSearch("white")}
                    onMouseEnter={() => setColorSearch(json.third)}
                    style={{ transition: "0.5s" }}
                    onClick={handleSubmit}
                />
            </Button>
        </Form>
    )
}

export default Search;