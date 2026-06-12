import { useState, useEffect } from 'react';

interface Location {
  pathname: string;
  search: string;
  hash: string;
}

export function useLocation(): Location {
  const [location, setLocation] = useState<Location>({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return location;
}

export function navigate(to: string): void {
  window.history.pushState({}, '', to);
  
  // Trigger a navigation event so components can detect the change
  window.dispatchEvent(new PopStateEvent('popstate'));
}