import React, { useContext } from 'react';
import { FirebaseClassContext } from './App';
import './styles/Header.scss';

function Header(): JSX.Element {
  const _firebase = useContext(FirebaseClassContext);
  const signOut = () => {
    _firebase.signOut();
    _firebase.setIsSignedIn(false);
  };
  return (
    <div id='header'>
      <button id='signout' onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Header;
