import { createGlobalStyle } from 'styled-components';
// //////////////////////////////////////////////////

export default createGlobalStyle`
  body {
    font-size: 14px;
    font-family: Montserrat;

    a {
      text-decoration: none;
    }

    h2 {
      font-family: Caveat;
    }

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
