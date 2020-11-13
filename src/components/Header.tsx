import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseClassContext } from './App';
import { INITIAL_LEVEL } from './Levels';
import './styles/Header.scss';

function Header(): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const signOut = () => {
    void context?.firebase?.signOut().then(() => {
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
      <Link
        className="headerItem"
        to={'/' + (context?.firebase.user?.level || INITIAL_LEVEL)}
      >
        Current Level
      </Link>
      <p className="headerItem" id="score">
        score: {context?.firebase.user?.score || 0}
      </p>
    </div>
  );
}

export default Header;
