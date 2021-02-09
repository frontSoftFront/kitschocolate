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

export const Counter = styled.div`
  right: 14px;
  width: 24px;
  bottom: 10px;
  height: 24px;
  display: flex;
  font-size: 10px;
  font-weight: bold;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
  color: ${Theme.colors.white};
  background: ${Theme.colors.pink};
  box-shadow: 0 0 5px rgb(0 0 0 / 28%);
`;
