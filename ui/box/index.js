import styled from 'styled-components';
import {
  top,
  left,
  right,
  space,
  width,
  order,
  bottom,
  height,
  border,
  display,
  opacity,
  minWidth,
  maxWidth,
  overflowY,
  maxHeight,
  borderTop,
  borderLeft,
  background,
  borderColor,
  borderRight,
  borderBottom,
  borderRadius
} from 'styled-system';
// //////////////////////////////////////////////////

export const Box = styled.div`
  ${space}
  ${width}
  ${order}
  ${height}
  ${border}
  ${opacity}
  ${display}
  ${minWidth}
  ${maxWidth}
  ${overflowY}
  ${maxHeight}
  ${borderTop}
  ${background}
  ${borderLeft}
  ${borderRight}
  ${borderBottom}
  ${borderRadius}
  ${borderColor}

  cursor: ${({ cursor }) => cursor};
  transition: ${({ transition }) => transition};
`;

export const RelativeBox = styled(Box)`
  ${top}
  ${left}
  ${right}
  ${bottom}

  position: relative;
`;
