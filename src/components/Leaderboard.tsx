import React, { useContext, useState, useEffect } from 'react';
import { FirebaseClassContext } from './App';
import './styles/Leaderboard.scss';

interface Score {
  name?: string;
  email?: string;
  level?: string;
  score?: number;
}
function Leaderboard(): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const [scores, setScores] = useState<Array<Score>>([]);
  useEffect(() => {
    context.getTopScores().then((scores: Array<Score>) => {
      setScores(
        scores
          .sort(function (a, b) {
            return (b.score || 0) - (a.score || 0);
          })
          .slice(0, 10)
      );
    });
  }, []);
  return (
    <div>
      <p>Leaderboard </p>
      <ol>
        {scores.map((user, i) => (
          <li id="entry" key={String(user.name) + i}>
            {user.name} {user.score || 0}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
