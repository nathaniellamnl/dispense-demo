import React, { useState, Fragment } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';

import NavigationItems from './MainSideBar/NavigationItems/NavigationItems'
import Header from '../components/Navigation/MainNavigation/MainNavigation'
import classes from './Main.module.css';
import Patient from '../components/Patient/Patient';
import Search from '../components/Search/Search';
import AuthContext from '../context/auth-context';


const Main = (props) => {

    return (
        <AuthContext.Consumer>
            {(context) => {
                // if (context.token) {
                return (
                    <Fragment>
                        <Header />

                        <div className={classes.main_container}>
                            <menu className={classes.main_sidebar}>
                            <NavigationItems className={classes.sidebar} />
                                {/* <div><NavLink to="/patient">Patient</NavLink></div>
                                <div><NavLink to="/search">Search</NavLink></div> */}
                            </menu>
                            <div className={classes.main_content}>
                                <Route
                                    path="/patient"
                                    render={props => (
                                        <Patient
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    path="/search"
                                    render={props => (
                                        <Search
                                            {...props}
                                        />
                                    )}
                                />

                            </div>
                        </div>
                    </Fragment>
                )
                // } else {
                //     return <Redirect to='/signin' />
                // }
            }}
        </AuthContext.Consumer>
    )
}

export default Main;