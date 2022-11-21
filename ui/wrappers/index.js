import styled from 'styled-components';
import { space } from 'styled-system';
// //////////////////////////////////////////////////

export const PageWrapper = styled.main`
  ${space}
  max-width: 1400px;
`;

export const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;
