import React, { useRef, useContext, useState, Fragment } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { graphqlServerUrl } from '../assets/String'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const authData = useContext(AuthContext);
  const history = useHistory();


  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const requestBody = {
      query: `
         query {
           login (email: "${email}", password: "${password}") {
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
            <Fragment>
              <h1 style={{ textAlign: "center" }}>Dispense Application</h1>
              <div style={{ textAlign: "center",paddingBottom:"0", marginBottom:"0" }}>
                <img src={logo} width="50" height="50" />
              </div>
              <Container component="main" maxWidth="xs">
                {isLoading ? <Loader /> : null}
                <CssBaseline />
                <div className={classes.paper}>

                  <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                  <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      inputRef={emailRef}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      inputRef={passwordRef}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign In
          </Button>

                  </form>
                </div>
                <Box mt={8}>
                </Box>
                <p>(For demo purpose)You can use test@test.com as the email and 123456 as the password</p>
              </Container>
            </Fragment>
          )
        } else {
          return <Redirect to="/" />
        }
      }}
    </AuthContext.Consumer>
  );
}