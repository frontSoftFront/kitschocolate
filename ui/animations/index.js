import styled, { css, keyframes } from 'styled-components';
import {
  top,
  left,
  width,
  space,
  height,
  position,
  background,
  boxShadow
} from 'styled-system';
// //////////////////////////////////////////////////

const fadeIn = keyframes`
  from {
    opacity:0;
    transform:translateX(0);
  }
  to {
    opacity: 1;
    transform:translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideRight = keyframes`
  0% {
    transform: translateX(-80vw);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-80vw);
  }
`;

const slideMenuLeft = keyframes`
  0% {
    transform: translateX(80vw);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideMenuRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(80vw);
  }
`;

const scaleUpTop = keyframes`
  0% {
    transform: scaleY(1);
    transform-origin: 100% 0%;
  }
  100% {
    transform: scaleY(1.4);
    transform-origin: 100% 0%;
  }
`;

const scaleDownTop = keyframes`
  0% {
    transform: scaleY(1.4);
    transform-origin: 100% 0%;
  }
  100% {
    transform: scaleY(1);
    transform-origin: 100% 0%;        
  }
`;

const defaultAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
`;

export const getAnimationName = animationName => {
  switch (animationName) {
    case 'fade-in':
      return fadeIn;
    case 'fade-out':
      return fadeOut;
    case 'slide-right':
      return slideRight;
    case 'slide-left':
      return slideLeft;
    case 'slide-menu-left':
      return slideMenuLeft;
    case 'slide-menu-right':
      return slideMenuRight;
    case 'scale-up-top':
      return scaleUpTop;
    case 'scale-down-top':
      return scaleDownTop;
    default:
      return defaultAnimation;
  }
};

export const animation = ({ animationName, animationProps }) => css`
  animation: ${getAnimationName(animationName)} ${animationProps};
`;

export const AnimatedBox = styled.div`
  ${top}
  ${left}
  ${width}
  ${space}
  ${height}
  ${position}
  ${animation}
  ${boxShadow}
  ${background}
`;
