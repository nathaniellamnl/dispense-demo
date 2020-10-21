import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './components/auth/Signin'

const App = props => {

  let routes = (
    <Switch>
      <Route
        path="/"
        exact
        render={props => (
          <LoginPage
            {...props}
            onLogin={this.loginHandler}
            loading={this.state.authLoading}
          />
        )}
      />
      <Route
        path="/signup"
        exact
        render={props => (
          <SignupPage
            {...props}
            onSignup={this.signupHandler}
            loading={this.state.authLoading}
          />
        )}
      />
      <Redirect to="/" />
    </Switch>
  );
  if (this.state.isAuth) {
    routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <FeedPage userId={this.state.userId} token={this.state.token} />
          )}
        />
        <Route
          path="/:postId"
          render={props => (
            <SinglePostPage
              {...props}
              userId={this.state.userId}
              token={this.state.token}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );


  return (
    {routes}
    < BrowserRouter >
      <Switch>
        <Route path="/" exact component={Signin} />
      </Switch>
    </BrowserRouter >
  );
}

export default App;
