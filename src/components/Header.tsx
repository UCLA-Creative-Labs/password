import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
    <div className="header">
      <p className="headerItem" id="signOut" onClick={signOut}>
        logout
      </p>
      <Link className="headerItem" to="/leaderboard">
        leaderboard
      </Link>
      <Link className="headerItem" to={'/' + _firebase.user?.level}>
        Current Level
      </Link>
      <p className="headerItem" id="score">
        score: {_firebase?.user?.score || 0}
      </p>
    </div>
  );
}

export default Header;
