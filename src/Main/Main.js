import React, { useState, Fragment } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';

import NavigationItems from './MainSideBar/NavigationItems/NavigationItems'
import Layout from '../components/Layout/Layout'
import classes from './Main.module.css';
import NewPatient from '../components/Patient/NewPatient/NewPatient';
import ExistingPatient from '../components/Patient/ExisitingPatient/ExistingPatient';
import Search from '../components/Search/Search';
import AuthContext from '../context/auth-context';


const Main = (props) => {

    return (
        <AuthContext.Consumer>
            {(context) => {
                // if (context.token) {
                return (
                    <Layout>
                        <main className={classes.main_container}>
                            {/* <menu className={classes.main_sidebar}>
                                <NavigationItems />
                            </menu> */}
                                <Switch>
                                    <Route
                                        path="/patient/new"
                                        render={props => (
                                            <NewPatient
                                                {...props}
                                                routeName="/patient/new"
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/patient/existing"
                                        render={props => (
                                            <ExistingPatient
                                                {...props}
                                                routeName="/patient/existing"
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
                                </Switch>
                        </main>
                    </Layout>
                )
                // } else {
                //     return <Redirect to='/signin' />
                // }
            }}
        </AuthContext.Consumer>
    )
}

export default Main;