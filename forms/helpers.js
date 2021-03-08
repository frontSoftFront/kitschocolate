import { getIn } from 'formik';
// theme
import Theme from '../theme';
// //////////////////////////////////////////////////

export const renderBorderColor = ({ id, errors, touched }) => {
  const touch = getIn(touched, id);
  const error = getIn(errors, id);
  const hasError = touch && error;

  return hasError ? Theme.colors.inputErrorColor : Theme.colors.lightGrey;
};
