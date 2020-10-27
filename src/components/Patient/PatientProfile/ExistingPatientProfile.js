import React, { Fragment } from 'react';
import {Switch,Route} from 'react-router-dom';

import DispenseRecord from './DispenseRecord/DispenseRecord';
import TransactionRecord from './TransactionRecord/TransactionRecord';
import Header from '../PatientProfile/ExistingPatientHeader/EPHeaderNav';
import classes from '../PatientProfile/ExistingPatientHeader/EPHeaderNav.module.css';
import PersonalInfo from '../PersonalInfo/Personalnfo';

const ExistingPatientProfile = (props) => {


    return (
        <Fragment>
            <Header/>
            <div className={classes.main_content}>
                <Switch>
                    <Route
                        path="/patient/existing/:id/personainfo"
                        render={props => (
                            <PersonalInfo
                                {...props}
                                routeName="/patient/existing"
                            />
                        )}
                    />
                    <Route
                        path="/patient/existing/:id/dispenserecord"
                        render={props => (
                            <DispenseRecord
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/patient/existing/:id/transactionrecord"
                        render={props => (
                            <TransactionRecord
                            />
                        )}
                    />
                </Switch>
            </div>
        </Fragment>
    )
}

export default ExistingPatientProfile;