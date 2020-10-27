import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { FirebaseClassContext } from '../App';
import Level1 from './Level1';
import Level2 from './Level2';

// Add new levels here
export const LEVELS: { [url: string]: JSX.Element } = {
  level1: <Level1 />,
  level2: <Level2 />,
};
export const INITIAL_LEVEL = 'level1';

interface LevelProps {
  children: JSX.Element | JSX.Element[];
  isCompleted: boolean;
  levelUrl: string;
  nextLevelUrl: string;
}

function findAttrIndex(target?: string) {
  let i = 0;
  for (const key in LEVELS) {
    if (key === target) {
      return i;
    }
    i++;
  }
  return -1;
}
export default function Level(props: LevelProps): JSX.Element {
  const context = useContext(FirebaseClassContext);
  const [user, setUser] = useState(context.user);
  const [finishUpdate, setFinishUpdate] = useState(false);
  useEffect(() => {
    context.getUser().then((newUser) => {
      setUser(newUser);
    });
  }, [user?.level]);

  if (!user) {
    return <Redirect to={'/'} />;
  } else if (user.level && user.level != props.levelUrl) {
    return (
      <div>
        <h3>nah ah ah</h3>
        <Link to={`/${user.level}`}>Go back whence you came</Link>
      </div>
    );
  } else if (props.isCompleted) {
    if (findAttrIndex(user.level) < findAttrIndex(props.nextLevelUrl)) {
      context
        .updateUser({
          name: user.name,
          level: props.nextLevelUrl,
          email: user.email,
        })
        .then(() => {
          setFinishUpdate(true);
        });
    }

    if (finishUpdate) return <Redirect to={`/${props.nextLevelUrl}`} />;
    else return <h1>Loading...</h1>;
  }

  return <div>{props.children}</div>;
}
