import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children }) {
  const elRef = useRef(null);

  useEffect(() => {
    // Try to find existing portal root
    let portalRoot = document.getElementById('portal-root');
    
    // Create portal root if it doesn't exist
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = 'portal-root';
      document.body.appendChild(portalRoot);
      console.warn('Portal root element was missing and has been created.');
    }

    // Create portal container if it doesn't exist
    if (!elRef.current) {
      const div = document.createElement('div');
      div.style.position = 'relative';
      div.style.zIndex = '9999';
      elRef.current = div;
    }

    portalRoot.appendChild(elRef.current);

    // Cleanup
    return () => {
      if (elRef.current) {
        try {
          portalRoot.removeChild(elRef.current);
          // Remove portal root if it's empty
          if (!portalRoot.hasChildNodes()) {
            document.body.removeChild(portalRoot);
          }
        } catch (error) {
          console.error('Error cleaning up portal:', error);
        }
      }
    };
  }, []);

  if (!elRef.current) {
    return null;
  }

  return createPortal(children, elRef.current);
}

export default Portal;
