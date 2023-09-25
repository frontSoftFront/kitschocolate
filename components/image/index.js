import * as R from 'ramda';
import Image from 'next/image';
// ui
import { RelativeBox } from '../../ui';
// //////////////////////////////////////////////////

const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>
`;

const toBase64 = str =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const ImageComponent = props => {
  if (R.propEq('placeholder', 'blur', props)) {
    return (
      <RelativeBox {...props.wrapperStyles}>
        <Image
          style={{ objectFit: 'contain' }}
          {...R.dissoc('wrapperStyles', props)}
          alt={R.propOr('', 'alt', props)}
          sizes={R.pathOr('100vw', ['sizes'], props)}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />
      </RelativeBox>
    );
  }

  return (
    <Image
      {...props}
      alt={R.propOr('', 'alt', props)}
      sizes={R.pathOr('100vw', ['sizes'], props)}
    />
  );
};

export default ImageComponent;
