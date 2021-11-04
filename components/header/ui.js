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

export const Nav = styled.nav`
  ${space}
  ${width}
  ${color}
  ${fontSize}
  ${maxWidth}
  ${alignItems}
  ${flexDirection}
  ${justifyContent}
  display: ${({ display }) => display || 'flex'};
`;

export const NavItem = styled(StyledLink)`
  position: relative;
  font-weight: ${({ active }) => (active ? 'bold' : '500')};
  color: ${({ active }) =>
    active ? Theme.colors.woodyBrown : Theme.colors.lightSlateGrey};

  &:hover {
    font-weight: bold;
    color: ${Theme.colors.woodyBrown};
  }

  &:after {
    left: 0;
    top: 110%;
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    background: ${Theme.colors.woodyBrown};
    display: ${({ active }) => (active ? 'block' : 'none')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  }
`;

export const BasketCount = styled.div`
  width: 20px;
  right: 10px;
  height: 20px;
  bottom: 10px;
  display: flex;
  font-size: 10px;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
  color: ${Theme.colors.white};
  box-shadow: 0 0 5px rgb(0 0 0 / 28%);
  background: ${Theme.colors.mediumWood};
`;

export const StyledHeader = styled.header`
  top: 0;
  left: 0;
  z-index: 100;
  position: sticky;
  background: ${Theme.colors.white};
`;
