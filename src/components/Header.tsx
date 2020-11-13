import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseClassContext } from './App';
import './styles/Header.scss';

function Header(): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const signOut = () => {
    void context.signOut().then(() => {
      window.location.replace('/');
    });
  };
  const [score, setScore] = useState(0);
  useEffect(() => {
    context
      .getUser()
      .then((user: { score?: number }) => setScore(user.score || 0))
      .catch(e => e);
  }, []);

  return (
    <div className="header">
      <p className="headerItem" id="signOut" onClick={signOut}>
        logout
      </p>
      <Link className="headerItem" to="/leaderboard">
        leaderboard
      </Link>
      <Link className="headerItem" to={'/' + context.user?.level}>
        Current Level
      </Link>
      <p className="headerItem" id="score">
        score: {score}
      </p>
    </div>
  );
}

export default Header;
