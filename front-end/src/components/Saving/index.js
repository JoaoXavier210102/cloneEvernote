import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsArrowRepeat, BsCheck } from "react-icons/bs";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Static = styled.span`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 20px;
`

const Rotate = styled.span`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 20px;
    animation: ${rotate} 1s ease infinite;
`

const Saving = ({active}) => {
    return active ? (
        <Rotate>
            <BsArrowRepeat size={25} color="white" />
        </Rotate>
    ) : (
        <Static>
            <BsCheck size={30} color="white" />
        </Static>
    )

}

export default Saving;