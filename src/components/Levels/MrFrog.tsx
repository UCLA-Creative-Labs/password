import React, { useState } from 'react';

import cthulhu from '../../assets/cthulhu.png';
import summon from '../../assets/summon.png';
import summoningCircle from '../../assets/summoningCircle.png';
import Level from '../Levels';

export default function MrFrog(): JSX.Element {
  const [isCompleted, setIsCompleted] = useState(false);
  const [transition, setTransition] = useState(false);
  const complete = () => {
    setIsCompleted(true);
  };

  const [password, setPassword] = useState('');

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (password == 'frogalicious') {
      setTransition(true);
      setTimeout(complete, 3000);
    } else {
      setPassword('');
    }
  };

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'thegreatone'}
      nextLevelUrl={'maze'}
    >
      <h4 style={{ textAlign: 'center' }}>
        &quot;O great Cthulhu, I summon you!&quot;
      </h4>
      <a href="https://discord.gg/2DHu2YSdDU" rel="noreferrer" target="_blank">
        <img
          src={transition ? cthulhu : summoningCircle}
          alt="cthulhu"
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '30%',
          }}
        />
      </a>
      <div style={{ textAlign: 'center' }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'inline-block', position: 'relative' }}
        >
          <label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input
            src={summon}
            type="image"
            value="Summon"
            style={{
              width: '30px',
              height: '30px',
              bottom: '0px',
              right: '-35px',
              position: 'absolute',
            }}
          />
        </form>
        <p style={{ fontSize: '2vw' }}>Hint: Call for me in the 227th cavern</p>
      </div>
    </Level>
  );
}
