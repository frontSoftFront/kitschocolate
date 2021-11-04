import styled from 'styled-components';
import {
  flexWrap,
  alignItems,
  flexDirection,
  justifyContent
} from 'styled-system';
// ui
import { Box } from '../box';
// //////////////////////////////////////////////////

export const Flex = styled(Box)`
  ${flexWrap}
  ${alignItems}
  ${flexDirection}
  ${justifyContent}

  display: ${({ display }) => display || 'flex'};
`;
