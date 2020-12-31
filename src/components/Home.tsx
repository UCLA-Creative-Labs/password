import React, { useContext } from 'react';
import { FirebaseClassContext } from './App';
import { INITIAL_LEVEL } from './Levels';

import './styles/Home.scss';

function Home(): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const level = context?.firebase.user?.level ?? INITIAL_LEVEL;

  return (
    <div id="homeWrapper">
      <div id="wrapper">
        <div id="title">Welcome to Password!</div>
        <div id="text">
          A game created by{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://creativelabsucla.com/"
          >
            Creative Labs
          </a>
        </div>
        <button
          id="button"
          type="button"
          onClick={() => window.location.replace(`/${level}`)}
        >
          { level == INITIAL_LEVEL ? "START" : "CONTINUE" }
        </button>
      </div>
    </div>
  );
}

export default Home;
