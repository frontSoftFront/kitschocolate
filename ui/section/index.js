import styled from 'styled-components';
import {
  space,
  width,
  height,
  alignItems,
  borderColor,
  borderBottom,
  flexDirection,
  justifyContent
} from 'styled-system';
// //////////////////////////////////////////////////

export const Section = styled.div`
  ${space}
  ${width}
  ${height}
  ${alignItems}
  ${borderBottom}
  ${borderColor}
  ${flexDirection}
  ${justifyContent}
  display: ${({ display }) => display};
`;
