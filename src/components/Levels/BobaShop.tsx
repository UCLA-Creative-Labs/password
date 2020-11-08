import React, { useState } from 'react';

import b1 from '../../assets/BobaAssets/b1.svg';
import b2 from '../../assets/BobaAssets/b2.svg';
import b3 from '../../assets/BobaAssets/b3.svg';
import b4 from '../../assets/BobaAssets/b4.svg';
import b5 from '../../assets/BobaAssets/b5.svg';

import Level from '../Levels';
import '../styles/Lucy.scss';

export default function BobaShop(): JSX.Element {
  const [ isCompleted, setIsCompleted ] = useState(false);
  const [password, setPassword] = useState('');

  const complete = () => {
    setIsCompleted(true);
  };

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (password == 'decaf') {
      complete();
    } else {
      setPassword('');
    }
  };

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'ff00ff'}
      nextLevelUrl={'level1'}>
      <div id="container">
        <p className="bigtext">welcome to the <span style={{ color: '#00b0ba' }}>b0ba</span> shop</p>
        <div className="row" style={{ width: '600px' }}>
          <img src={b1} />
          <img src={b2} />
          <img src={b3} />
          <img src={b4} />
          <img src={b5} />
        </div>
        <div style={{ margin: '20px' }}>
          <p className="bigtext">how do I like my drinks?</p>
          <input
            placeholder="_ _ _ _ _"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ height: 'auto', padding: '12px 20px' }}
          />
          <button className="teal-button" onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </Level>
  );
}
