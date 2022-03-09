import styled from "styled-components";
import json from "../../config/colors.json";

const Subtittle = styled.h2`
    text-align: ${props => props.align};
    font-weight: ${props => props.weight};
    font-size: ${props => `${props.size}px`};
    color: ${props => props.color === "primary" ? json.primary : props.color === "default" ? "black" : "white"};
`

export default Subtittle;