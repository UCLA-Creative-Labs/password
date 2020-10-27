import React, { useEffect, useState } from 'react';

import Level from '../Levels';

export default function NoInternet(): JSX.Element {
  const [ isOnline, setIsOnline ] = useState(true);

  const handleOffline = () => {
    setIsOnline(false);
  };

  const handleOnline = () => {
    setIsOnline(true);
  }

  useEffect(() => {
    window.addEventListener('offline', handleOffline);

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <Level
      levelUrl='grid'
      nextLevelUrl=''
      isCompleted={false}
    >
      <h2>{ isOnline ? 'Online' : 'Offline' }</h2>
    </Level>
  );
}
