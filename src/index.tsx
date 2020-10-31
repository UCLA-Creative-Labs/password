import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import View from './components/JLevel';

import './global.scss';

ReactDOM.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>,
  document.getElementById('root'),
);
