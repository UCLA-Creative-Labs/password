import React, { useState, useEffect } from 'react';
import '../styles/Spam.scss';
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
import back from '../../assets/SpamAssets/insts.png';
import Level from '../Levels';

export default function Spam(): JSX.Element {
  const [isCompleted, setIsCompleted] = useState(false);
  const [nads, setNads] = useState(5);
  const [spam, setSpam] = useState([]);

  useEffect(() => {
    initSpam();
  }, []);

  function initSpam() {
    let tsp = []
    for(let i = 0; i < nads; i++){
      const adn = 'ad'+randInt(9);
      const ad = getAd(adn);
      tsp.push(<img className='spam' src={ad}/>);
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

  function RenderDisplay(): JSX.Element {
    const top = 50+'%';
    const left = 50+'%';
    return (
      <div>
        <img className='displayImg' src={back}/>
        {RenderSpam()}
      </div>
    );
  }

  function randInt(max) {
    return Math.floor(Math.random()*Math.floor(max));
  }

  function randOff(){
    return randInt(80)+'%';
  }

  function RenderSpam(): JSX.Element {
    

    return (
      <div>
        {spam.map((sp) => {
	  const left = randOff();
	  const top = randOff();
	  return <div style={{position:'absolute',left:left,top:top}}>{sp}</div>
	})}
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
        {RenderDisplay()}
      </div>
    </Level>
  );
}