import styled from 'styled-components';
import { space, order, border, position } from 'styled-system';
// //////////////////////////////////////////////////

export const IconWrapper = styled.div`
  ${space}
  ${order}
  ${border}
  ${position}
  opacity: 0.9;
  width: max-content;
  cursor: ${({ cursor }) => cursor || 'pointer'};

  &:hover {
    opacity: 1;
  }
`;
