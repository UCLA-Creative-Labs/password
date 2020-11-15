import React, { useContext, useState, useEffect } from 'react';
import { FirebaseClassContext } from './App';
import './styles/Leaderboard.scss';

export interface Score {
  name?: string;
  score?: number;
}
function Leaderboard(): JSX.Element {
  const context = useContext(FirebaseClassContext);

  const [scores, setScores] = useState<Score[]>([]);
  useEffect(() => {
    void context.firebase.getTopScores().then((s) => setScores(s));
  }, []);
  return (
    <div className="container">
      <p className="title">Leaderboard </p>
      <ol className="entryContainer">
        {scores.map((user, i) => (
          <li className="entry" key={String(user.name) + i}>
            {user.name} {user.score || 0}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
