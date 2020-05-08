import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FallbackUI from './components/FallbackUI';

const MainView = React.lazy(() => import('./views/Main'));
const DetailsView = React.lazy(() => import('./views/Details'));

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Suspense fallback={<FallbackUI />}>
          <Route path='/' exact component={MainView} />
          <Route path='/:name' exact component={DetailsView} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
