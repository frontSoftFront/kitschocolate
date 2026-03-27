import styled from 'styled-components';
import {
  color,
  space,
  width,
  display,
  opacity,
  fontSize,
  maxWidth,
  textAlign,
  lineHeight,
  fontFamily,
  fontWeight,
  background
} from 'styled-system';
// //////////////////////////////////////////////////

export const Text = styled.p`
  ${space}
  ${color}
  ${width}
  ${display}
  ${opacity}
  ${fontSize}
  ${maxWidth}
  ${textAlign}
  ${lineHeight}
  ${background}
  ${fontFamily}
  ${fontWeight}

  cursor: ${({ cursor }) => cursor};
  word-break: ${({ wordBreak }) => wordBreak};
  text-transform: ${({ textTransform }) => textTransform};
  text-decoration: ${({ textDecoration }) => textDecoration};
  overflow: ${({ overflow = 'initial', withEllipsis }) =>
    withEllipsis ? 'hidden' : overflow};
  white-space: ${({ withEllipsis }) => (withEllipsis ? 'nowrap' : 'initial')};
  text-overflow: ${({ withEllipsis }) =>
    withEllipsis ? 'ellipsis' : 'initial'};
  
  &:hover {
    color: ${({ hoveredColor }) => hoveredColor};
  }
`;
