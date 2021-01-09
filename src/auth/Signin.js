import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import classesCss from './Signin.module.css';
import { graphqlServerUrl } from '../assets/String'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from '../context/auth-context';
import Loader from '../UI/Loader/Loader';
import logo from '../assets/Images/logo192.png';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#a30000",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const authData = useContext(AuthContext);

  const submitHandler = (event) => {
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
    fetch(graphqlServerUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',

      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }

      return res.json();
    }).then(resData => {
      if (resData.data.login.token) {
        authData.login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration);
      }

    }).catch(err => {
      setIsLoading(false);
      alert("Incorrect email or password!");
    })

  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        if (!context.token) {
          return (
            <div className={classesCss["Background"]}>
              <div className={classesCss["Card-overlay"]}>
                  <div>
                    <h1 className={classesCss["App-name"]}>Dispense</h1>
                    <div className={classesCss["Logo-container"]}>
                      <img src={logo} width="50" height="50"/>
                    </div>
                    <Container component="main" maxWidth="xs">
                      {isLoading ? <Loader /> : null}
                      <CssBaseline />
                      <div className={classes.paper}>
                        <h1 className={classesCss["Header"]}>
                          Sign in
                     </h1>
                        <form className={classes.form} noValidate onSubmit={submitHandler}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                          >
                            Sign In(No Password/Email required)
                     </Button>
                        </form>
                      </div>
                    </Container>
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