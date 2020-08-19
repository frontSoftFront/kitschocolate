import styled from 'styled-components';
import {
  color,
  space,
  opacity,
  fontSize,
  textAlign,
  lineHeight,
  fontFamily,
  fontWeight
} from 'styled-system';
// //////////////////////////////////////////////////

export const Text = styled.div`
  ${space}
  ${color}
  ${opacity}
  ${fontSize}
  ${textAlign}
  ${lineHeight}
  ${fontFamily}
  ${fontWeight}
  word-break: ${({ wordBreak }) => wordBreak};
  text-decoration: ${({ textDecoration }) => textDecoration};
`;
