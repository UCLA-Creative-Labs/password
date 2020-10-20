import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/App.scss';

import Header from './Header';
import Home from './Home';
import Level1 from './Level1';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
firebase.initializeApp(config);

function App(): JSX.Element {
  const [user, setUser] = useState<Object>({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
        setUser(user);
      }
    });
  });

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        setIsSignedIn(true);
        return false;
      },
    },
  };

  const signOut = () => {
    firebase.auth().signOut().then(() => setIsSignedIn(false));
  }
  
  if (!isSignedIn) {
    return (
      <div id='authWrapper'>
        <div className='text' id='signIn'> Sign In </div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
  return (
    <div className='app'>
      <Header signOut={signOut} />
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
  );
}

export default App;