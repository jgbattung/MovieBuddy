import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import routes from './config/routes';
import './App.css'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { loginAction } from './store/actions/authActions';
import { fetchAndSetUserData } from './utils/firebaseFunctions';
import { setUserData } from './store/actions/userActions';
import { IUserData } from './interfaces/userData';

const App: React.FunctionComponent = () => {
  const history = useHistory ();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(loginAction());
        
        const userData = await fetchAndSetUserData()
        if (userData) {
          dispatch(setUserData(userData as IUserData));
          console.log('Success');
        }

        if (history && history.location.pathname !== '/homepage') {
          history.replace(history.location.pathname);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);


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