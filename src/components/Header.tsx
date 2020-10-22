import React, { useContext } from 'react';
import {FirebaseClassContext} from './App';
import { _Firebase } from '../utils/firebase';
import './styles/Header.scss';

// interface HeaderProps {
//   firebase: _Firebase;
// }

function Header(): JSX.Element {
  const _firebase = useContext(FirebaseClassContext);
  return (
    <div id='header'>
      <button id='signout' onClick={_firebase.signOut}>Sign Out</button>
    </div>
  );
}

export default Header;
