// components
import Portal from '../portal';
// ui
import { ModalWrapper } from '../../ui';
// //////////////////////////////////////////////////

const Ripple = () => (
  <>
    <div className="lds-ripple">
      <div />
      <div />
    </div>
    <style jsx>{`
      .lds-ripple {
        width: 100px;
        height: 100px;
        position: relative;
        display: inline-block;
      }

      .lds-ripple div {
        opacity: 1;
        position: absolute;
        border-radius: 50%;
        border: 4px solid white;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }

      .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
      }

      @keyframes lds-ripple {
        0% {
          width: 0;
          top: 36px;
          height: 0;
          left: 36px;
          opacity: 0;
        }
        4.9% {
          top: 36px;
          left: 36px;
          width: 0;
          height: 0;
          opacity: 0;
        }
        5% {
          top: 36px;
          left: 36px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: 0px;
          left: 0px;
          width: 72px;
          height: 72px;
          opacity: 0;
        }
      }
    `}</style>
  </>
);

const Loader = () => (
  <Portal selector="#loader">
    <ModalWrapper>
      <Ripple />
    </ModalWrapper>
  </Portal>
);

export default Loader;
