import React, { useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import json from "../../config/colors.json";

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

const Search = (action) => {

    const [colorSearch, setColorSearch] = useState("white")

    return (
        <Form action={action}>
            <Input type="search" placeholder="Search" />
            <Button type="submit">
                <BiSearch
                    size={30}
                    color={colorSearch}
                    onMouseLeave={() => setColorSearch("white")}
                    onMouseEnter={() => setColorSearch(json.third)}
                    style={{transition: "0.5s"}}
                />
            </Button>
        </Form>
    )
}

export default Search;