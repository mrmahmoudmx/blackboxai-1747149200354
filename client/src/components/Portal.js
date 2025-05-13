import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children }) {
  const elRef = useRef(null);

  useEffect(() => {
    const portalRoot = document.getElementById('portal-root');
    
    if (!elRef.current) {
      elRef.current = document.createElement('div');
      elRef.current.style.position = 'relative';
      elRef.current.style.zIndex = '9999';
    }

    portalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        portalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  if (!elRef.current) {
    return null;
  }

  return createPortal(children, elRef.current);
}

export default Portal;
