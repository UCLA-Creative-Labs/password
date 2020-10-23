import React, { useState } from 'react';

import Level from '../Levels';

export default function Level1(): JSX.Element {
  const [ isCompleted, setIsCompleted ] = useState(false);

  const complete = (_: React.MouseEvent) => {
    setIsCompleted(true);
  };

  return (
    <Level
      isCompleted={isCompleted}
      levelUrl={'level1'}
      nextLevelUrl={'level2'}>
      <h1>Level1</h1>
      <p>Click <a onClick={complete}>here</a> to proceed to the next level.</p>
    </Level>
  );
}
