import React, { useEffect, useState } from 'react';

import Level from '../Levels';
import '../styles/Ghostie.scss';

export default function Ghostie(): JSX.Element {
  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ isIncognito, setIsIncognito ] = useState(false);

  const complete = () => {
    if(isIncognito){
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      void navigator.storage.estimate().then(({usage, quota}) => {
        if(quota && quota < 1200000000){
          setIsIncognito(true);
        }
      });
    } else {
      setIsIncognito(true);
    }
  });

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'shhhh'}
      nextLevelUrl={'level1'}>
      <div id='background' className={isIncognito ? 'incog' : 'reg'}>
        <div id='wrapper'>
          <div id='ghostie' className={isIncognito ? 'incog' : 'reg'}/>
          <div id='fakeInput'>
            <form>
              <div id='input' >
                <label>
                  <input
                    type='text'
                    placeholder='hmmmm... tell me a secret'
                    onPaste={(e) => e.preventDefault()}
                    className={isIncognito ? 'incog' : 'reg'}
                  />
                </label>
              </div>
              <div>
                <button id='ghostieButton' className={isIncognito ? '' : 'disabled'} onClick={complete}>
                  <div id='ghostieIcon'/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Level>
  );
}
