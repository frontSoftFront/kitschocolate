import * as R from 'ramda';
// //////////////////////////////////////////////////

export const isNotNil = R.complement(R.isNil);
export const isNotEmpty = R.complement(R.isEmpty);
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
