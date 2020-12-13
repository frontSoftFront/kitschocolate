import styled from 'styled-components';
import {
  space,
  width,
  height,
  border,
  fontWeight,
  borderColor,
  borderRadius
} from 'styled-system';
// //////////////////////////////////////////////////

export const Input = styled.input`
  ${space}
  ${width}
  ${height}
  ${border}
  ${fontWeight}
  ${borderColor}
  ${borderRadius}

  cursor: text;
  outline: none;

  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    margin: 0;
  }
`;
