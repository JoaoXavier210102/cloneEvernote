import styled, { keyframes } from 'styled-components';
import BaseAnimation from '../BaseAnimation';

const FadeInAnimation = keyframes`  
    0% {
      opacity: 0;
      transform: translateY(-30px);
   }
   100% {
      opacity: 1;
      transform: translateY(0);
   }
`;

const FadeInDown = styled(BaseAnimation)`
    animation-name: ${FadeInAnimation};
`;

export default FadeInDown;