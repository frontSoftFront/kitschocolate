import styled from 'styled-components';
import {
  space,
  order,
  width,
  height,
  border,
  display,
  position
} from 'styled-system';
// //////////////////////////////////////////////////

export const IconWrapper = styled.div`
  ${space}
  ${order}
  ${width};
  ${border}
  ${height}
  ${position}

  opacity: 0.9;
  user-select: none;
  cursor: ${({ cursor }) => cursor || 'pointer'};

  &:hover {
    opacity: 1;
  }
`;
