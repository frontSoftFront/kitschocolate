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

  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.05);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
