import styled from 'styled-components';
import {
  space,
  width,
  color,
  order,
  height,
  border,
  display,
  fontSize,
  background,
  borderColor
} from 'styled-system';
// //////////////////////////////////////////////////

export const Button = styled.button`
  ${space}
  ${width}
  ${color}
  ${order}
  ${height}
  ${border}
  ${display}
  ${fontSize}
  ${background}
  ${borderColor}

  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  text-transform: ${({ textTransform }) => textTransform};

  &:hover {
    color: ${({ hoverColor }) => hoverColor};
    transform: ${({ hoverTransform }) => hoverTransform};
    background: ${({ hoverBackground }) => hoverBackground};
    border-color: ${({ hoverBorderColor }) => hoverBorderColor};
  }
`;
