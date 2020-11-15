import React, { useState, useEffect, createContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UserInfo, _Firebase } from '../utils/firebase';

import './styles/App.scss';

import Error from './404';
import Construction from './Construction';
import Header from './Header';
import Home from './Home';
import Leaderboard from './Leaderboard';
import { LEVELS } from './Levels';

export const FirebaseClassContext = createContext({
  firebase: new _Firebase(),
  updateFirebase: (_u: UserInfo) => {
    return new Promise((_x) => {
      _x;
    });
  },
});

export default function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined);
  const [firebase, setFirebase] = useState(new _Firebase());
  function updateFirebase(userInfo: UserInfo) {
    return firebase.updateUser(userInfo).then(() => {
      // Copy firebase object so React will detect state change
      setFirebase(
        Object.assign(Object.create(Object.getPrototypeOf(firebase)), firebase),
      );
    });
  }
  useEffect(() => {
    firebase.load(
      () => {
        setIsSignedIn(true);
      },
      () => {
        setIsSignedIn(false);
      },
    );
  }, []);

  if (isSignedIn === undefined) {
    return (
      <div className="center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div id="authWrapper">
        <div className="text" id="signIn">
          {' '}
          Sign In{' '}
        </div>
        <StyledFirebaseAuth
          uiConfig={firebase.uiConfig()}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }

  return (
    <FirebaseClassContext.Provider
      value={{ firebase: firebase, updateFirebase }}
    >
      <div className="app">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" render={Home} />
            {Object.keys(LEVELS).map((levelUrl) => (
              <Route
                key={levelUrl}
                exact
                path={`/${levelUrl}`}
                render={() => LEVELS[levelUrl]}
              ></Route>
            ))}
            <Route exact path="/leaderboard" render={() => <Leaderboard />} />
            <Route exact path="/construction" render={() => <Construction />} />
            <Route render={Error} />
          </Switch>
        </Router>
      </div>
    </FirebaseClassContext.Provider>
  );
}
