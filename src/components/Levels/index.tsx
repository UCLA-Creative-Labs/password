import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { FirebaseClassContext } from '../App';
import Ghostie from './Ghostie';
import MrFrog from './MrFrog';
import JLevel from './jlevel';
import TypeRacerLevelWrapper from './TypeRacerLevel';

// Add new levels here
export const LEVELS: { [url: string]: JSX.Element } = {
  shhhh: <Ghostie />,
  typeracer: <TypeRacerLevelWrapper />,
  thegreatone: <MrFrog />,
  maze: <JLevel />,
};
export const INITIAL_LEVEL = 'shhhh';

interface LevelProps {
  children: JSX.Element | JSX.Element[];
  isCompleted: boolean;
  levelUrl: string;
  nextLevelUrl: string;
  points: number;
}

export default function Level(props: LevelProps): JSX.Element {
  const [isCompleted, setIsCompleted] = useState(false);

  const context = useContext(FirebaseClassContext);

  const hasNotReachedLevel = (levelUrl: string): boolean => {
    if (context?.user?.level === 'admin') return false;
    const keys = Object.keys(LEVELS);
    return (
      !context.user ||
      !context.user.level ||
      keys.indexOf(context.user.level) < keys.indexOf(levelUrl)
    );
  };

  useEffect(() => {
    if (!props.isCompleted) return;

    if (hasNotReachedLevel(props.nextLevelUrl)) {
      void context
        .updateUser({
          level: props.nextLevelUrl,
          score: (context?.user?.score ?? 0) + props.points,
        })
        .then(() => {
          setIsCompleted(true);
        });
    } else {
      setIsCompleted(true);
    }
  }, [props.isCompleted]);

  if (isCompleted) {
    return <Redirect to={`/${props.nextLevelUrl}`} />;
  } else if (!context.user) {
    return <Redirect to={'/'} />;
  } else if (hasNotReachedLevel(props.levelUrl)) {
    return (
      <div>
        <h3>nah ah ah</h3>
        <Link to={`/${context.user.level}`}>Go back whence you came</Link>
      </div>
    );
  }

  return <div>{props.children}</div>;
}
