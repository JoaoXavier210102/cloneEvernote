import styled from "styled-components";
import json from "../../config/colors.json";

const Tittle = styled.h1`
    text-align: ${props => props.align};
    font-weight: ${props => props.weight};
    font-size: ${props => `${props.size}px`};
    color: ${props => props.color === "primary" ? json.primary : "white"};
`

export default Tittle;