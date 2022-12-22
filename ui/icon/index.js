import styled from 'styled-components';
import {
  space,
  order,
  width,
  right,
  height,
  border,
  display,
  position,
  background
} from 'styled-system';
// //////////////////////////////////////////////////

export const IconWrapper = styled.div`
  ${space}
  ${right}
  ${order}
  ${width};
  ${border}
  ${height}
  ${display}
  ${position}
  ${background}

  opacity: 0.9;
  user-select: none;
  cursor: ${({ cursor }) => cursor || 'pointer'};

  &:hover {
    opacity: 1;
  }
`;
