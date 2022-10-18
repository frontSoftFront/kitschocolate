import styled from 'styled-components';
import {
  space,
  color,
  display,
  opacity,
  fontSize,
  textAlign,
  fontWeight,
  alignItems,
  justifyContent
} from 'styled-system';

export const StyledLink = styled.a`
  ${color}
  ${space}
  ${display}
  ${opacity}
  ${fontSize}
  ${textAlign}
  ${fontWeight}
  ${alignItems}
  ${justifyContent}

  cursor: pointer;

  text-transform: ${({ textTransform }) => textTransform};
  &:hover {
    color: ${({ hoveredColor }) => hoveredColor};
  }
`;
