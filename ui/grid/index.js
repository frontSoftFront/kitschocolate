import styled from 'styled-components';
import { space, gridGap, gridTemplateColumns } from 'styled-system';
// //////////////////////////////////////////////////

export const Grid = styled.div`
  ${space}
  ${gridGap}
  ${gridTemplateColumns}

  display: ${({ display }) => display || 'grid'};
`;
