import React, { Fragment, useReducer, useEffect,Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from './Main/Main';
import LoginPage from './auth/Signin';
import AuthContext from './context/auth-context';
import sideDrawer from './components/Navigation/SideDrawer/SideDrawer';
const PrintEntry = React.lazy(() => import('./components/Patient/PatientProfile/TransactionRecord/PrintTransaction/PrintTransaction'));

const authStateReducer = (currentAuthState, action) => {
  switch (action.type) {
    case 'Login':
      localStorage.setItem("dispenseToken",action.token);
      return { ...currentAuthState, token: action.token, userId: action.userId };
    case 'Logout':
      localStorage.removeItem("dispenseToken");
      return { ...currentAuthState, token: null, userId: null };
    default:
      throw new Error('Should not get there!');
  }
};


const App = props => {

  const [authState, dispatch] = useReducer(authStateReducer, {});
  
  useEffect(() => {
    document.title = "Dispense"
 }, []);

  const login = (token, userId, tokenExpiration) => {
    dispatch({ type: 'Login', token: token, userId: userId });
  }

  const logout = () => {
    dispatch({ type: 'Logout' });
  }

  return (
    <BrowserRouter>
      <Fragment>
        <AuthContext.Provider value={{
          token: authState.token,
          userId: authState.userId,
          login: login,
          logout: logout
        }}>
          <main>
            <Switch>
              <Route
                path="/signin"
                render={props => (
                  <LoginPage
                    {...props}
                  />
                )}
              />
              <Route  
              path="/print"
                render={props => (
                  <Suspense fallback={<div>Loading...</div>}>
                      <PrintEntry/>
                  </Suspense>
                )}
              />
              <Route
                path="/"
                render={props => (
                  <Main
                    {...props}
                  />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </main>
        </AuthContext.Provider>
      </Fragment>
    </BrowserRouter>
  );

}

export default App;
