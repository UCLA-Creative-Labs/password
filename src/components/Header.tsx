import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseClassContext } from './App';
import { INITIAL_LEVEL } from './Levels';
import './styles/Header.scss';

function Header(): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const signOut = () => {
    void context?.firebase?.signOut();
  };
  const level = context?.firebase.user?.level ?? INITIAL_LEVEL;

  return (
    <div className="header">
      <Link className="headerItem" to="/" onClick={signOut}>
        Sign Out
      </Link>
      <Link className="headerItem" to="/leaderboard">
        Leaderboard
      </Link>
      <Link className="headerItem" to={`/${level}`}>
        Current Level
      </Link>
      <p className="headerItem" id="score">
        Score: {context?.firebase.user?.score || 0}
      </p>
    </div>
  );
}

export default Header;
