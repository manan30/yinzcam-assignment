import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from './views/Main';
import DetailsView from './views/Details';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/:name' component={DetailsView} />
        <Route path='/' component={MainView} />
      </Switch>
    </Router>
  );
}

export default App;
