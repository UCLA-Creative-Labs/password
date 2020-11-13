import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseClassContext } from './App';
import './styles/Header.scss';

function Header(): JSX.Element {
  const _firebase = useContext(FirebaseClassContext);
  const signOut = () => {
    void _firebase.signOut().then(() => {
      window.location.replace('/');
    });
  };
  return (
    <div id="header">
      <p id="score">score: {_firebase?.user?.score || 0}</p>
      <button id="signout" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Header;
