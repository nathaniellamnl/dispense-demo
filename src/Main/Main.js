import React, { Fragment, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../components/Layout/Layout'
import classes from './Main.module.css';
import NewPatient from '../components/Patient/NewPatient/NewPatient';
import ExistingPatient from '../components/Patient/ExisitingPatient/ExistingPatient';
import DrugInfo from '../components/DrugInfo/DrugInfo';
import Home from '../components/Home/Home';


const Main = (props) => {
    const [shrink, setShrink] = useState(true);

    const shrinkToggler = (toggle) => {
        setShrink(toggle);
    }

    let attachedClasses;
    if(shrink) {
        attachedClasses = [classes["main-container"], classes.Shrink];
    } else {
        attachedClasses = [classes["main-container"], classes.Normal];
    }

    return (
        
        <Fragment>
            {
                localStorage.getItem("dispenseToken") != null && localStorage.getItem("dispenseToken") != "null" ?
                   (
                        <Layout shrinkToggler = {shrinkToggler}>
                            <main className={attachedClasses.join(' ')}>
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
                                    <Route
                                        path="/home"
                                        render={props => (
                                            <Home 
                                            />
                                        )}
                                    />
                                    <Redirect to="/home" />
                                </Switch>

                            </main>
                        </Layout>
                    )
                    : <Redirect to='/signin' />
            }
        </Fragment>
    )
}

export default Main;