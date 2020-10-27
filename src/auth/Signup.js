import React, { useRef } from 'react';
import {Redirect} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from '../context/auth-context';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const rePassword = /^(?=.*?[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/

    if (!reEmail.test(String(email).toLowerCase())) {
      return console.log("Invalid email");
    }

    if (!rePassword.test(String(password))) {
      return console.log("Invalid password");
    }

    const requestBody = {
      query: `
         mutation {
           createUser (userInput:{email: "${email}", password: "${password}"}) {
             _id
             email
           }
         }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      res.json();
    }).then(resData => {
      console.log(resData);
    }).catch(err => {
      console.log(err);
    })

  };
  return (<AuthContext.Consumer>
    {(context) => {
      if(!context.token) {
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
          </Typography>
              <form className={classes.form} noValidate onSubmit={submitHandler}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      inputRef={emailRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      inputRef={passwordRef}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
            </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2" >
                      Already have an account? Sign in
                </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        )
      } else {
       return  <Redirect to='/' />
      }
      
    }}
  </AuthContext.Consumer>
  );
}