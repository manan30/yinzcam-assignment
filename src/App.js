import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { MainView as Main, DetailsView as Details } from './views';
import FallbackUI from './components/FallbackUI';

const MainView = React.lazy(() => import('./views/Main'));
const DetailsView = React.lazy(() => import('./views/Details'));

function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<FallbackUI />}>
          <Route path='/:name' exact component={DetailsView} />
          <Route path='/' exact component={MainView} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
