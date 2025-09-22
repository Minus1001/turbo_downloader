import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.frameworkReady === 'function') {
        window.frameworkReady();
      }
    } catch (error) {
      console.warn('Framework ready callback failed:', error);
    }
  }, []);
}
