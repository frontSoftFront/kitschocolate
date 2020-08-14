import styled from 'styled-components';
import {
  space,
  width,
  color,
  height,
  border,
  display,
  fontSize,
  background,
  borderColor
} from 'styled-system';
// //////////////////////////////////////////////////

export const Button = styled.div`
  ${space}
  ${width}
  ${color}
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
    background: ${({ hoverBackground }) => hoverBackground};
  }
`;
