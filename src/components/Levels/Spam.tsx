import React, { useState, useEffect } from 'react';
import '../styles/Spam.scss';
import back from '../../assets/SpamAssets/insts.png';
import ad0 from '../../assets/SpamAssets/2weird.png';
import ad1 from '../../assets/SpamAssets/shmingles.png';
import ad2 from '../../assets/SpamAssets/glorp.png';
import ad3 from '../../assets/SpamAssets/gleep.png';
import ad4 from '../../assets/SpamAssets/peanuts.png';
import ad5 from '../../assets/SpamAssets/hotchess.png';
import ad6 from '../../assets/SpamAssets/hei.png';
import ad7 from '../../assets/SpamAssets/rocks.png';
import ad8 from '../../assets/SpamAssets/freefish.png';
import ad9 from '../../assets/SpamAssets/tackybitch.png';
import Level from '../Levels';

export default function Spam(): JSX.Element {
  const [isCompleted, setIsCompleted] = useState(false);
  const nads = 7;
  const [spam, setSpam] = useState([]);

  useEffect(() => {
    initSpam();
  }, []);

  function initSpam() {
    let tsp = [];
    tsp = [];
    for(let i = 0; i < nads; i++){
      const nsp = {
        top: randOff(),
        left: randOff(),
        key: randInt(9999)+'key',
        el: randSpam(),
      };
      tsp.push(nsp);
    }
    setSpam(tsp);
  }

  function getAd(adn) {
    switch(adn) {
      case 'ad0':
        return ad0;
      case 'ad1':
        return ad1;
      case 'ad2':
        return ad2;
      case 'ad3':
        return ad3;
      case 'ad4':
        return ad4;
      case 'ad5':
        return ad5;
      case 'ad6':
        return ad6;
      case 'ad7':
        return ad7;
      case 'ad8':
        return ad8;
      case 'ad9':
        return ad9;
    }
  }

  function RenderDisplay(lst): JSX.Element {
    return (
      <div>
        <img className='displayImg' src={back}/>
        {RenderSpam(lst)}
      </div>
    );
  }

  function randInt(max) {
    return Math.floor(Math.random()*Math.floor(max));
  }

  function randOff() {
    return randInt(80)+'%';
  }

  function randSpam() {
    const adn = 'ad'+randInt(10);
    const ad = getAd(adn);
    const spamad = <img className='spam' src={ad}/>;
    return spamad;
  }

  function closeSpam(k) {
    let tsp = [];
    for(let i = 0; i < spam.length; i++){
      tsp.push(spam[i]);
    }
    for(let i = 0; i < tsp.length; i++){
      if(tsp[i].key == k){
        console.log(tsp);
	console.log(tsp[i]);
        tsp.splice(i, 1);
      }
    }
    if(tsp.length == 0){
      setIsCompleted(true);
      return;
    }
    const timer = setTimeout(() => {
      let n = spam.length;
      if(n != 0 && n < nads && !isCompleted){
        openSpam();
      }
    }, 1000);
    setSpam(tsp);
  }

  function openSpam() {
    if(spam.length >= nads || isCompleted){
      return;
    }
    let tsp = [];
    tsp = [];
    for(let i = 0; i < spam.length; i++){
      tsp.push(spam[i]);
    }
    const nsp = {
     top: randOff(),
     left: randOff(),
     key: randInt(9999)+'key',
     el: randSpam(),
    };
    tsp.push(nsp);
    setSpam(tsp);
  }

  function RenderSpam(lst): JSX.Element {
    const spamcont = lst.map((sp) => {
      return <div
        style={{position: 'absolute',left: sp.left,top: sp.top}}
        onClick={() => closeSpam(sp.key)}
        className='spammy'
	key={sp.key}
      >{sp.el}
      </div>;
    });
    return (
      <div>
        {spamcont}
      </div>
    );
  }

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'spam'}
      nextLevelUrl={'pending'}
    >
      <div>
        {RenderDisplay(spam)}
      </div>
    </Level>
  );
}