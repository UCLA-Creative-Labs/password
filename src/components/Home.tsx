import React, {useState}from 'react';

import './styles/Home.scss';

function Home(): JSX.Element {
  return (
    <div id='homeWrapper'>
      <div id="wrapper">
        <div id='title'>
          Welcome to BigSpook!
        </div>
        <div id='text'>
          A game created by <a target="_blank" href='https://creativelabsucla.com/'>
            Creative Labs
          </a>
        </div>
        <button id='button' type='button' onClick={()=>window.location.replace('/shhhh')}>Start</button>
      </div>
    </div>
  );
}

export default Home;