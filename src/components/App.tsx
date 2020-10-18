import React from 'react';

import './styles/App.scss';
import {checkPassword} from  '../actions/Utils'
function App(): JSX.Element {
  checkPassword({name: "level1", password:"abcd"})
  return(
    <div>
      <h1 className='text'>Creative Labs | notpron</h1>
    </div>
  );
}

export default App;
