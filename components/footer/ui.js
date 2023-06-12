import { space } from 'styled-system';
import styled from 'styled-components';
// theme
import Theme from '../../theme';
// ui
import { StyledLink } from '../../ui';
// //////////////////////////////////////////////////

export const Nav = styled.nav`
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 1023px) {
    width: 250px;
  }

  @media (max-width: 580px) {
    width: 200px;
    margin: 20px 0px;
  }
`;

export const StyledFooter = styled.footer`
  ${space}

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-top: 2px solid;
  justify-content: space-around;
  border-color: ${Theme.colors.quincy};

  @media (max-width: 580px) {
    flex-direction: column;
  }
`;

export const NavItem = styled(StyledLink)`
  display: block;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 580px) {
    width: 100px;
  }
`;
