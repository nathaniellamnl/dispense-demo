import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './Signin.module.css';
import AuthContext from '../context/auth-context';
import Loader from '../ui/Loader/Loader';
import logo from '../assets/Images/logo192.png';
import {graphqlRequest} from '../utils/graphqlRequest';

export default function SignIn(props) {
  const [isLoading, setIsLoading] = useState(false);
  const authData = useContext(AuthContext);

  const submitHandler = async(event) => {
    event.preventDefault();

    const requestBody = {
      query: `
         query {
           login (email: "test@test.com", password: "123456") {
             userId
             token
             tokenExpiration
           }
         }
      `
    };

    setIsLoading(true);
    
    const resData = await graphqlRequest(requestBody);
    setIsLoading(false);
    if(resData.error){
      alert("An error occured!"); 
    } else {
      if (resData.data.login.token) {
        authData.login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration);
      }
    }
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        if (!context.token) {
          return (
            <div className={classes["Background"]}>
              <div className={classes["Card-overlay"]}>
                <div className={classes["Container"]}>
                  <h1 className={classes["App-name"]}>Dispense</h1>
                  <div className={classes["Logo-container"]}>
                    <img src={logo} width="50" height="50" alt="App-Logo" />
                  </div>
                  <h1 className={classes["Header"]}>
                    Sign in
                     </h1>
                  <button
                    type="button"
                    onClick={submitHandler}
                    className={classes["button"]}
                  >
                    Sign In(No Password/Email required)
                  </button>
                  <a href="https://nathanlam.site/dispense/dispense.html" target="_blank"><h2>Documentation</h2></a>
                  
                  {isLoading ? <Loader /> : null}
                </div>
              </div>
            </div>
          )
        } else {
          return <Redirect to="/" />
        }
      }}
    </AuthContext.Consumer>
  );
}