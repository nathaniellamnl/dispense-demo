import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../components/Layout/Layout'
import classes from './Main.module.css';
import NewPatient from '../components/Patient/NewPatient/NewPatient';
import ExistingPatient from '../components/Patient/ExisitingPatient/ExistingPatient';
import DrugInfo from '../components/DrugInfo/DrugInfo';


const Main = (props) => {

    return (
        <Fragment>
            {/* <AuthContext.Consumer> */}
            {/* {(context) => {
                if (context.token) { */}
            {
                localStorage.getItem("dispenseToken")!=null && localStorage.getItem("dispenseToken")!="null"?
                    (
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
                                                token={localStorage.getItem("dispenseToken")}
                                                routeName="/patient/new"
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/patient/existing"
                                        render={props => (
                                            <ExistingPatient
                                                token={localStorage.getItem("dispenseToken")}
                                                {...props}
                                                routeName="/patient/existing"
                                            />
                                        )}
                                    />
                                       <Route
                                        path="/druginfo"
                                        render={props => (
                                            <DrugInfo
                                                token={localStorage.getItem("dispenseToken")}
                                                {...props}
                                            />
                                        )}
                                    />
                                </Switch>
                            </main>
                        </Layout>
                    )
                    : <Redirect to='/signin' />
            }
            {/* }} */}
            {/* </AuthContext.Consumer> */}
        </Fragment>
    )
}

export default Main;