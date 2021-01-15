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
      case 'a': case 'ArrowLeft':
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

  /* eslint-disable no-useless-escape */
  const isMobile = () =>  {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  return (
    <Level
      levelUrl='lightsout'
      nextLevelUrl='onthego'
      isCompleted={isCompleted}
    >
      {
        isMobile()
          ? (
            <div id={'mobile-base'}>
              <h2>This level doesn&apos;t work on mobile :(</h2>
            </div>
          )
          : (
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

              <div id={'arrows'}>
              </div>
            </div>
          )
      }
    </Level>
  );
}
