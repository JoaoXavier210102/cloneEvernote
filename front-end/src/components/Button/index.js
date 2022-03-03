import styled from "styled-components";
import json from "../../config/colors.json";

const Button = styled.button`
    border: none;
    color: white;
    padding: 10px 35px;
    cursor: pointer;
    border-radius: 25px;
    background-color: ${props => props.variant === "outlined" ? "transparent" : `${json.primary}`};
    border: ${props => props.variant === "outlined" && `2px solid ${json.primary}`};
    font-weight: bold;
    transition: 0.3s;
    float: ${props => props.float};
    justify-self: ${props => props.justify};
    ${props => props.size === "small" ? `
        font-size: 15px;
    ` : props.size === "large" ? `
        font-size: 20px;
    ` : `
        font-size: 18px;
    `}
    :hover{
        ${props => props.variant === "outlined" ? `
            border-color: ${json.third};
        ` : `
            background-color: ${json.third}
        `}
    }

`;

export default Button;
//AUMENTA SÓ A FONTE do BOTÂO para aumentar ou diminuir o tamanho
//Variant => outlined
//color => primary / secondary
//size => 
