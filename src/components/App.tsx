import React, { useState, useEffect } from 'react';
import firebaseui from 'react-firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import './styles/App.scss';

const config = {
  apiKey: "AIzaSyARYdiOJuzS_DpdMhWPkunOy2zi1a_oM88",
  authDomain: "bigspook-7b263.firebaseapp.com",
  databaseURL: "https://bigspook-7b263.firebaseio.com",
  projectId: "bigspook-7b263",
  storageBucket: "bigspook-7b263.appspot.com",
  messagingSenderId: "636133052717",
  appId: "1:636133052717:web:ed2cf2142e95d7f71983a4",
  measurementId: "G-EPQTX4RGJ9"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};


function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);

  if(!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
  return(
    <div>
      <h1 className='text'>Creative Labs | notpron</h1>
    </div>
  );
}

export default App;