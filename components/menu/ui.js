import styled from 'styled-components';
import {
  space,
  width,
  color,
  fontSize,
  maxWidth,
  alignItems,
  flexDirection,
  justifyContent
} from 'styled-system';
// theme
import Theme from '../../theme';
// ui
import { StyledLink } from '../../ui';
// //////////////////////////////////////////////////

export const MenuWrapper = styled.div`
  left: 0;
  right: 0;
  top: 84px;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;
