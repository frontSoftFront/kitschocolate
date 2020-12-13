import styled from 'styled-components';
import { space, width, height, maxWidth, maxHeight } from 'styled-system';
// //////////////////////////////////////////////////

export const Img = styled.img`
  ${space}
  ${width}
  ${height}
  ${maxWidth}
  ${maxHeight}
  cursor: ${({ cursor }) => cursor};
`;
