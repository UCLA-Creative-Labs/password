
import React, { useState, useEffect, createContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { _Firebase } from '../utils/firebase';

import './styles/App.scss';

import Header from './Header';
import Home from './Home';
import Level1 from './Level1';

export const FirebaseClassContext = createContext(new _Firebase());

export default function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [_firebase] = useState<_Firebase>(new _Firebase());

  useEffect(() => {
    _firebase.load({ setIsSignedIn });
  }, []);

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
          <Route exact path="/" render={Home} />
          <Route
            exact
            path="/level1"
            render={() => <Level1 name="level1" nextLevel="/level2" />}
          ></Route>
          <Route
            exact
            path="/level2"
            render={() => <Level1 name="level2" nextLevel="/level3" />}
          ></Route>
        </Router>
      </div>
    </FirebaseClassContext.Provider>
  );
}
