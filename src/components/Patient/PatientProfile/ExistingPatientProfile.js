import React, { Fragment, Suspense, useEffect, useState } from 'react';

import Header from '../PatientProfile/ExistingPatientHeader/EPHeaderNav';
import classes from './ExistingPatientProfile.module.css';
import {graphqlServerUrl} from '../../../assets/String';
const DispenseRecord = React.lazy(() => import('./DispenseRecord/DispenseRecord'));
const TransactionRecord = React.lazy(() => import('./TransactionRecord/TransactionRecord'));
const PersonalInfo = React.lazy(() => import('../PersonalInfo/Personalnfo'));

const ExistingPatientProfile = (props) => {

    const [component, setComponent] = useState("personalinfo");
    const [patientInfo, setPatientInfo] = useState('');
    
    useEffect(() => {
          const requestBody = {
            query: `  
                 query {
                   patients(_id:"${window.location.pathname.split('/')[3]}") {
                    caseCode
                    chineseName 
                    englishName
                   }
                 }
              `
          };
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
            setPatientInfo([...resData.data.patients, {_id:window.location.pathname.split('/')[3]}]);
    
          }).catch(err => {
            console.log(err);
          })
    
      }, [window.location.pathname]);
    
    const onClickHandler = (id) => {
        setComponent(id);
    }

    return (
        <Fragment>
            <Header onNavHandler={onClickHandler} clickedHeader={component}/>
            <div className={classes['component-container']}>
                {component === "personalinfo" ?
                    <Suspense fallback={<h1>loading...</h1>}>
                        <PersonalInfo
                            {...props}
                            routeName="/patient/existing"
                        />
                    </Suspense>
                    : null}
                {component === "transactionrecord" ?
                    <Suspense fallback={<h1>loading...</h1>}>
                        <TransactionRecord
                        patientInfo={patientInfo}
                        patientId={window.location.pathname.split('/')[3]}
                            {...props}
                        />
                    </Suspense>
                    : null}
                {component === "dispenserecord" ?
                    <Suspense fallback={<h1>loading...</h1>}>
                        <DispenseRecord
                        patientInfo={patientInfo}
                            {...props}
                        />
                    </Suspense>
                    : null}
            </div>
        </Fragment >
    )
}


export default React.memo(ExistingPatientProfile);