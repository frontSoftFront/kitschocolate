import styled from 'styled-components';
import { order, gridGap, gridTemplateColumns } from 'styled-system';
// ui
import { StyledLink } from '../../ui';
// //////////////////////////////////////////////////

export const Nav = styled.nav`
  ${gridGap}
  ${gridTemplateColumns}
  display: ${({ display }) => display || 'grid'};
`;

export const NavItem = styled(StyledLink)`
  ${order}

  &: hover {
    opacity: 1;
  }
`;
