import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './config/routes';

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.component} />
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  );
};


export default App