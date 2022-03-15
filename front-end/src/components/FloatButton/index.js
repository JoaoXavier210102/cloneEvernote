import styled, {keyframes} from "styled-components";
import json from "../../config/colors.json"

const animationUp = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`

const Floatbutton = styled.div`
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin: 25px;
    border-radius: 5px;
    background-color: ${json.secondary};
    padding: 10px 15px;
    color: white;
`

export default Floatbutton;