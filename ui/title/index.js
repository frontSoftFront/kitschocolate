import * as R from 'ramda';
import styled from 'styled-components';
import {
  color,
  space,
  fontSize,
  textAlign,
  fontWeight,
  lineHeight,
  fontFamily
} from 'styled-system';
// theme
import Theme from '../../theme';
// //////////////////////////////////////////////////

const Title = tag => styled(tag)`
  ${space}
  ${color}
  ${fontSize}
  ${textAlign}
  ${lineHeight}
  ${fontFamily}
  ${fontWeight}
`;

const H1 = Title('h1');
const H2 = Title('h2');
const H3 = Title('h3');

export const PageTitleComponent = props => (
  <H1 {...R.merge(Theme.styles.pageTitle, props)}>{props.text}</H1>
);

export const PageTitle = styled.h1`
  ${space}
  ${color}
  ${fontSize}
  ${textAlign}
  ${lineHeight}
  ${fontFamily}
  ${fontWeight}
`;

export const SectionTitle = styled.h2`
  ${space}
  ${color}
  ${fontSize}
  ${textAlign}
  ${lineHeight}
  ${fontWeight}
  ${fontFamily}
`;

export const ArticleTitle = styled.h3`
  ${space}
  ${color}
  ${fontSize}
  ${textAlign}
  ${lineHeight}
  ${fontWeight}
`;
