import React, { useState } from 'react';

import Level from '../Levels';

export default function Level2(): JSX.Element {
  const [isCompleted, setIsCompleted] = useState(false);

  const complete = () => {
    setIsCompleted(true);
  };

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'level2'}
      nextLevelUrl={'shhhh'}
    >
      <h1>Level2</h1>
      <p>
        Click <a onClick={complete}>here</a> to proceed to the next level.
      </p>
    </Level>
  );
}
