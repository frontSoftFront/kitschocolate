import styled from 'styled-components';
import { space, color, opacity, fontSize, fontWeight } from 'styled-system';

export const StyledLink = styled.a`
  ${color}
  ${space}
  ${opacity}
  ${fontSize}
  ${fontWeight}
  text-transform: ${({ textTransform }) => textTransform};
  &:hover {
    color: ${({ hoveredColor }) => hoveredColor};
  }
`;
