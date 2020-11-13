import React, { useEffect, useState } from 'react';
import { randomElement } from '../../utils/Utils';

import Level from '../Levels';
import '../styles/Ghostie.scss';

const inputTexts = [
  'hmmmm... tell me a secret',
  'Do you really want me to remember this?',
  'Somethings are better said in private...',
  'Okay my turn, I\'ll tell you something... wait no this is too public',
  'Shhhh... they\'re listening',
  '🤫👻',
  'Ughh I\'m shy... let\'s do this in private',
  'I can feel them watching 👀',
  'Make sure no one knows you visited this page 😉',
];

const endText = 'this conversation never happened';

export default function Ghostie(): JSX.Element {
  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ isIncognito, setIsIncognito ] = useState(false);
  const [ seen, setSeen ] = useState<string | null>();

  const complete = () => {
    if(isIncognito){
      setIsCompleted(true);
    }
  };

  function detectPrivateMode() {
    let db;
    const on = () => setIsIncognito(true);
    const off = () => setIsIncognito(false);

    function tryls() {
      try {
        localStorage.length ? off() : (localStorage.x = 1, localStorage.removeItem('x'), off());
      } catch (e) {
        // Safari does not enable cookie in private mode
        navigator.cookieEnabled ? on() : off();
      }
    }

    function isChrome(){
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }

    function testChrome(){
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        void navigator.storage.estimate().then(({usage, quota}) => {
          if(quota && quota < 1200000000) on();
        });
      }
    }

    // Blink (chrome & opera)
    isChrome() ? testChrome()
      // FF
      : 'MozAppearance' in document.documentElement.style ? (db = indexedDB.open('test'), db.onerror = on, db.onsuccess = off)
        // Safari
        : /constructor/i.test(window.HTMLElement) || window.safari ? tryls()
          // IE10+ & edge
          : !window.indexedDB && (window.PointerEvent || window.MSPointerEvent) ? on()
            // Rest
            : off();
  }

  useEffect(() => {
    detectPrivateMode();
    const storage = sessionStorage.getItem('ghostie');
    setSeen(storage);
    if(!storage) {
      sessionStorage.setItem('ghostie', inputTexts[0]);
    }
  });

  const refresh = () => {
    if (!isIncognito)
      location.reload();
  };

  const input = isIncognito ? endText :
    !seen ? inputTexts[0] : randomElement(inputTexts, seen);

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'shhhh'}
      nextLevelUrl={'typeracer'}
      points={100}
    >
      <div id='background' className={isIncognito ? 'incog' : 'reg'}>
        <div id='wrapper'>
          <div id='ghostie' className={isIncognito ? 'incog' : 'reg'}/>
          <div id='fakeInput'>
            <form
              onSubmit={(e) => { e.preventDefault(); refresh(); sessionStorage.setItem('ghostie', input); } }
            >
              <div id='input' >
                <label>
                  <input
                    type='text'
                    placeholder= {input}
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
