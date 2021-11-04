import styled from 'styled-components';
// theme
import Theme from '../../theme';
// ui
import { StyledLink } from '../../ui';
// //////////////////////////////////////////////////

export const Nav = styled.nav`
  display: flex;
  max-width: 630px;
  width: calc(100% - 380px);
  justify-content: space-between;
`;

export const StyledFooter = styled.footer`
  display: flex;
  padding: 50px 0;
  margin-top: 50px;
  align-items: center;
  border-top: 2px solid;
  justify-content: space-around;
  border-color: ${Theme.colors.quincy};
`;

export const NavItem = styled(StyledLink)`
  display: block;

  &: hover {
    opacity: 1;
  }
`;
