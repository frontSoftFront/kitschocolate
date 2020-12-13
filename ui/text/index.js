import styled from 'styled-components';
import {
  color,
  space,
  width,
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
  ${width}
  ${opacity}
  ${fontSize}
  ${textAlign}
  ${lineHeight}
  ${fontFamily}
  ${fontWeight}
  word-break: ${({ wordBreak }) => wordBreak};
  text-decoration: ${({ textDecoration }) => textDecoration};
`;
