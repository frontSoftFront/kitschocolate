import { createPortal } from 'react-dom';
import { useRef, useEffect, useState } from 'react';

const Portal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
