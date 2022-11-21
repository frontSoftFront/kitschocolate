import styled from 'styled-components';
import {
  space,
  width,
  height,
  flexWrap,
  maxWidth,
  alignItems,
  borderLeft,
  borderColor,
  borderBottom,
  flexDirection,
  justifyContent
} from 'styled-system';
// //////////////////////////////////////////////////

export const Section = styled.section`
  ${space}
  ${width}
  ${height}
  ${flexWrap}
  ${maxWidth}
  ${alignItems}
  ${borderLeft}
  ${borderBottom}
  ${borderColor}
  ${flexDirection}
  ${justifyContent}

  display: ${({ display }) => display};
`;
