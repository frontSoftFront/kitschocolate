import styled from 'styled-components';
import {
  space,
  width,
  height,
  display,
  maxWidth,
  maxHeight
} from 'styled-system';
// //////////////////////////////////////////////////

export const Img = styled.img`
  ${space}
  ${width}
  ${height}
  ${display}
  ${maxWidth}
  ${maxHeight}

  cursor: ${({ cursor }) => cursor};
  transform: ${({ transform }) => transform};
`;
