import React, { useEffect, useState, useRef } from 'react';

import Level from '../Levels';

import '../styles/NoInternet.scss';

export default function NoInternet(): JSX.Element {
  const DEFAULT_SPEED = 10;
  const MAX_SPEED = 30;
  const MAX_DIST_FROM_TARGET = 30;
  const COUNTDOWN_START = 3;

  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ isOnline, setIsOnline ] = useState(true);
  const [ isOnTarget, setIsOnTarget ] = useState(false);
  const [ countdownNum, setCountdownNum ] = useState(COUNTDOWN_START);

  const targetPos = useRef<[number, number]>([0,0]);
  const playerPos = useRef<[number, number]>([window.innerHeight / 2, window.innerWidth / 2]);
  const playerSpeed = useRef<number>(DEFAULT_SPEED);
  const isOnlineRef = useRef<boolean>(true);
  const hasToggledOnce = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleOffline = () => {
    setIsOnline(false);
    hasToggledOnce.current = true;
  };

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleKeypress = (e: KeyboardEvent) => {
    const player = document.getElementById('player');
    if (!player || !player.style || !isOnlineRef.current) return;

    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        if (playerPos.current[0] >= 0)
          playerPos.current[0] -= playerSpeed.current;
        break;
      case 'a':
      case 'ArrowLeft':
        if (playerPos.current[1] >= 0)
          playerPos.current[1] -= playerSpeed.current;
        break;
      case 's':
      case 'ArrowDown':
        if (playerPos.current[0] <= document.body.clientHeight - 100)
          playerPos.current[0] += playerSpeed.current;
        break;
      case 'd':
      case 'ArrowRight':
        if (playerPos.current[1] <= document.body.clientWidth - 100)
          playerPos.current[1] += playerSpeed.current;
        break;
      default:
        break;
    }
    playerSpeed.current = Math.min(playerSpeed.current + 1, MAX_SPEED);
    player.style.top = `${playerPos.current[0]}px`;
    player.style.left = `${playerPos.current[1]}px`;

    if (hasToggledOnce.current /* To make sure players can't accidentally find the target */ &&
        Math.abs(playerPos.current[0] - targetPos.current[0]) <= 2 * MAX_DIST_FROM_TARGET &&
        Math.abs(playerPos.current[1] - targetPos.current[1]) <= MAX_DIST_FROM_TARGET) {
      setIsOnTarget(true);
    } else {
      setIsOnTarget(false);
    }
  };

  const handleKeyup = (_: KeyboardEvent) => {
    playerSpeed.current = DEFAULT_SPEED;
  };

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    window.addEventListener('keydown', handleKeypress);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('keydown', handleKeypress);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  useEffect(() => {
    isOnlineRef.current = isOnline;

    if (!isOnline) {
      const target = document.getElementById('target');
      const targetTop = Math.floor(Math.random() * (document.body.clientHeight - 100));
      const targetLeft = Math.floor(Math.random() * (document.body.clientWidth - 100));
      targetPos.current = [
        targetTop, targetLeft,
      ];

      if (target && target.style) {
        target.style.top = `${targetPos.current[0]}px`;
        target.style.left = `${targetPos.current[1]}px`;
      }
    }
  }, [ isOnline ]);

  useEffect(() => {
    if (isOnTarget) {
      intervalRef.current = setInterval(() => {
        setCountdownNum(old => Math.max(old - 1, 0));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCountdownNum(COUNTDOWN_START);
    }
  }, [ isOnTarget ]);

  useEffect(() => {
    if (countdownNum <= 0) {
      setTimeout(() => setIsCompleted(true), 1000);
    }
  }, [ countdownNum ]);

  return (
    <Level
      levelUrl='lightsout'
      nextLevelUrl='onthego'
      isCompleted={isCompleted}
    >
      <div
        id={'base'}
        className={(isOnline ? 'on ' : 'off ')}
      >
        <div
          id={'player'}
          className={(isOnline ? 'on' : 'off')}
        >
          O<br/>
          /|\<br />
          / \
        </div>

        <div
          id={'target'}
          style={{
            visibility: (!isOnline ? 'visible' : 'hidden'),
          }}
        >
          X
        </div>

        <div
          id={'countdown'}
          style={{
            visibility: (isOnTarget ? 'visible' : 'hidden'),
          }}
        >
          {countdownNum > 0 ? countdownNum : '😎'}
        </div>

        <div
          id={'hint'}
          style={{
            visibility: ((isOnline && !isOnTarget) ? 'visible' : 'hidden'),
          }}
        >
          (turn the 💡 out!)
        </div>
      </div>
    </Level>
  );
}
