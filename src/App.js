import React, { Fragment, useReducer } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import Main from './Main/Main' 
import LoginPage from './auth/Signin';
import SignupPage from './auth/Signup';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import AuthContext from './context/auth-context';

const ingredientReducer = (currentAuthState, action) => {
  switch (action.type) {
    case 'Login':
      return {...currentAuthState, token: action.token, userId: action.userId};
    case 'Logout':
      return {...currentAuthState, token: null, userId: null};
    default:
      throw new Error('Should not get there!');
  }
};


const App = props => {

  const [authState, dispatch] = useReducer(ingredientReducer, {});

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
          logout: logout }}>

        <main>
          <Switch>
            <Route
              path="/signup"
              render={props => (
                <SignupPage
                  {...props}
                // onSignup={this.signupHandler}
                // loading={this.state.authLoading}
                />
              )}
            />
             <Route
              path="/signin"
              render={props => (
                <LoginPage
                  {...props}
                // onSignup={this.signupHandler}
                // loading={this.state.authLoading}
                />
              )}
            />
              <Route
              path="/"
              render={props => (
                <Main
                  {...props}
                // onLogin={this.loginHandler}
                // loading={this.state.authLoading}
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
