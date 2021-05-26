import styled from 'styled-components';
import { space, order, height, border, position } from 'styled-system';
// //////////////////////////////////////////////////

export const IconWrapper = styled.div`
  ${space}
  ${order}
  ${border}
  ${height}
  ${position}

  opacity: 0.9;
  user-select: none;
  cursor: ${({ cursor }) => cursor || 'pointer'};
  width: ${({ width }) => width || 'max-content'};

  &:hover {
    opacity: 1;
  }
`;
