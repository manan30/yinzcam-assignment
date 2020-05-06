import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainView, DetailsView } from './views';

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
