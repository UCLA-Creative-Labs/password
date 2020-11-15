import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { FirebaseClassContext } from '../App';

import BobaShop from './BobaShop';
import Ghostie from './Ghostie';
import JLevel from './jlevel';
import MrFrog from './MrFrog';
import TypeRacerLevelWrapper from './TypeRacerLevel';

// Add new levels here
export const LEVELS: { [url: string]: JSX.Element } = {
  shhhh: <Ghostie />,
  typeracer: <TypeRacerLevelWrapper />,
  thegreatone: <MrFrog />,
  maze: <JLevel />,
  ff00ff: <BobaShop />,
};
export const INITIAL_LEVEL = 'shhhh';

interface LevelProps {
  children: JSX.Element | JSX.Element[];
  isCompleted: boolean;
  levelUrl: string;
  nextLevelUrl: string;
  points?: number;
}

export default function Level(props: LevelProps): JSX.Element {
  const [isCompleted, setIsCompleted] = useState(false);

  const context = useContext(FirebaseClassContext);

  const hasNotReachedLevel = (levelUrl: string): boolean => {
    if (context?.firebase.user?.level === 'admin') return false;
    const keys = Object.keys(LEVELS);
    return (
      !context?.firebase.user ||
      !context?.firebase.user.level ||
      keys.indexOf(context?.firebase.user.level) < keys.indexOf(levelUrl)
    );
  };

  useEffect(() => {
    if (!props.isCompleted) return;

    if (hasNotReachedLevel(props.nextLevelUrl)) {
      const points = props.points ?? 100;
      void context
        .updateFirebase({
          level: props.nextLevelUrl,
          score: (context?.firebase.user?.score ?? 0) + points,
        })
        .then(() => {
          setIsCompleted(true);
        });
    } else {
      setIsCompleted(true);
    }
  }, [props.isCompleted, context.firebase]);

  if (isCompleted) {
    if (Object.keys(LEVELS).indexOf(props.levelUrl) === (Object.keys(LEVELS).length - 1))
      return <Redirect to={'/construction'} />;
    else
      return <Redirect to={`/${props.nextLevelUrl}`} />;
  } else if (!context?.firebase.user) {
    return <Redirect to={'/'} />;
  } else if (hasNotReachedLevel(props.levelUrl)) {
    return (
      <div>
        <h3>nah ah ah</h3>
        <Link to={`/${context?.firebase.user.level}`}>
          Go back whence you came
        </Link>
      </div>
    );
  }

  return <div>{props.children}</div>;
}
