import styled from 'styled-components';
import { gridGap, gridTemplateColumns } from 'styled-system';
// //////////////////////////////////////////////////

export const Grid = styled.div`
  ${gridGap}
  ${gridTemplateColumns}
  display: ${({ display }) => display || 'grid'};
`;
