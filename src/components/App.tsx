import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';
import Home from './Home';
import Level1 from './Level1';

function App(): JSX.Element {
  return (
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
  );
}

export default App;
