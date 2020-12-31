import React, { useEffect, useState, useRef } from 'react';

import Level from '../Levels';

import '../styles/NoInternet.scss';

export default function NoInternet(): JSX.Element {
  const [ isOnline, setIsOnline ] = useState(true);

  const playerPos = useRef<[number, number]>([0, 0]);

  const handleOffline = () => {
    setIsOnline(false);
  };

  const handleOnline = () => {
    setIsOnline(true);
  }

  const handleKeypress = (e: KeyboardEvent) => {
    const player = document.getElementById('player');
    if (!player || !player.style || !isOnline) return;

    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        if (playerPos.current[0] >= 0)
          playerPos.current[0] -= 10;
        break;
      case 'a':
      case 'ArrowLeft':
        if (playerPos.current[1] >= 0)
          playerPos.current[1] -= 10;
        break;
      case 's':
      case 'ArrowDown':
        if (playerPos.current[0] <= document.body.clientHeight - 100)
          playerPos.current[0] += 10;
        break;
      case 'd':
      case 'ArrowRight':
        if (playerPos.current[1] <= document.body.clientWidth - 100)
          playerPos.current[1] += 10;
        break;
      default:
        break;
    }
    player.style.top = `${playerPos.current[0]}px`;
    player.style.left = `${playerPos.current[1]}px`;
  }

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    window.addEventListener('keydown', handleKeypress);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('keydown', handleKeypress);
    };
  }, []);

  return (
    <Level
      levelUrl='grid'
      nextLevelUrl=''
      isCompleted={false}
    >
      <div
        className={(isOnline ? 'on ' : 'off ') + 'base'}
      >
        <div
          id={'player'}
        >
          O
        </div>
      </div>
    </Level>
  );
}
