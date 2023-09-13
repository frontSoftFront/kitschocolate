import { Roboto, Montserrat } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';
// //////////////////////////////////////////////////

const roboto = Roboto({
  display: 'auto',
  subsets: ['latin'],
  weight: ['400', '500', '900']
});

const montserrat = Montserrat({
  display: 'auto',
  subsets: ['latin'],
  weight: ['400', '500', '600']
});

export default createGlobalStyle`
  body {
    font-size: 14px;
    font-family: ${montserrat.style.fontFamily};
  }

  a {
    text-decoration: none;
  }

  h1, h2 {
    font-family: ${roboto.style.fontFamily};
  }

  * {
    border: 0;
    margin: 0;
    outline: 0;
    padding: 0;
    font-style: inherit;
    font-family: inherit;
    font-weight: inherit;
    box-sizing: border-box;
    background: transparent;
    vertical-align: baseline;
  }
`;
