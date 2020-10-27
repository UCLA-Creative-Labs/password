import React, { useState, useEffect, useContext, createContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { _Firebase } from '../utils/firebase';

import './styles/App.scss';

import Header from './Header';
import Error from './404';
import Home from './Home';
import { LEVELS } from './Levels';

export const FirebaseClassContext = createContext(new _Firebase());

export default function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined);
  const _firebase = useContext(FirebaseClassContext);

  useEffect(() => {
    _firebase.load(
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
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div id='authWrapper'>
        <div className='text' id='signIn'> Sign In </div>
        <StyledFirebaseAuth uiConfig={_firebase.uiConfig()} firebaseAuth={_firebase.auth()}/>
      </div>
    );
  }

  return (
    <FirebaseClassContext.Provider value={_firebase}>
      <div className='app'>
        <Header/>
        <Router>
          <Switch>
            <Route exact path='/' render={Home} />
            {
              Object.keys(LEVELS).map(levelUrl =>
                <Route
                  key={levelUrl}
                  exact
                  path={`/${levelUrl}`}
                  render={() => LEVELS[levelUrl]}
                ></Route>,
              )
            }
            <Route render={Error} />
          </Switch>
        </Router>
      </div>
    </FirebaseClassContext.Provider>
  );
}
