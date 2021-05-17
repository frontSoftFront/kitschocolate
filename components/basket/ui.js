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

export const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
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
