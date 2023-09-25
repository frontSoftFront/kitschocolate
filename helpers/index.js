import * as R from 'ramda';
import { toast } from 'react-toastify';
// //////////////////////////////////////////////////

export const isNotNil = R.complement(R.isNil);
export const notEquals = R.complement(R.equals);
export const isNotEmpty = R.complement(R.isEmpty);
export const notIncludes = R.complement(R.includes);
export const isNilOrEmpty = value => R.or(R.isNil(value), R.isEmpty(value));
export const isNotNilAndNotEmpty = value =>
  R.and(isNotNil(value), isNotEmpty(value));

export function setDebounce(func, wait) {
  let timeout;

  return function(...args) { // eslint-disable-line
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export const showToastifyMessage = (text, type = 'success') => {
  const toastifyMap = {
    error: toast.error,
    success: toast.success
  };
  const options = {
    autoClose: 5000,
    draggable: true,
    pauseOnHover: true,
    closeOnClick: true,
    progress: undefined,
    position: 'top-left',
    hideProgressBar: false
  };

  return toastifyMap[type](text, options);
};
