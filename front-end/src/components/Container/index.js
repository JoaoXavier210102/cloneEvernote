import styled from "styled-components";

const Container = styled.div`
    display: ${props => props.display};
    align-items: center;
    justify-content: ${props => props.justify};
    width: ${props => props.fullWidth && "100%"};
    height: ${props => props.height};
    flex-direction: ${props => props.direction};
    flex-wrap: wrap;
`

export default Container;