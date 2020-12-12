import React, { Suspense, useEffect, useState    } from 'react';

import Header from '../PatientProfile/ExistingPatientHeader/EPHeaderNav';
import classes from './ExistingPatientProfile.module.css';
import {graphqlServerUrl} from '../../../assets/String';
const TransactionRecord = React.lazy(() => import('./TransactionRecord/TransactionRecord'));
const PersonalInfo = React.lazy(() => import('../PersonalInfo/PersonalInfo'));

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
              'Authorization': 'Bearer '+ localStorage.getItem("dispenseToken")
            }
          }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error("Failed");
    
            }
            return res.json();
          }).then(resData => {
            setPatientInfo([...resData.data.patients, {_id:window.location.pathname.split('/')[3]}]);
    
          }).catch(err => {
            alert("An unexpected error occured!");
          })
    
      }, [window.location.pathname]);
    
    const onClickHandler = (id) => {
        setComponent(id);
    }

    return (
        <section >
            <Header onNavHandler={onClickHandler} clickedHeader={component}/>
            <div className={classes['component-container']}>
                {component === "personalinfo" ?
                    <Suspense fallback={<h1>loading...</h1>}>
                        <PersonalInfo
                            token={localStorage.getItem("dispenseToken")}
                            updateInfo={props.updateInfo}
                            {...props}
                            routeName="/patient/existing"
                        />
                    </Suspense>
                    : null}
                {component === "transactionrecord" ?
                    <Suspense fallback={<h1>loading...</h1>}>
                        <TransactionRecord
                        token={localStorage.getItem("dispenseToken")}
                        patientInfo={patientInfo}
                        patientId={window.location.pathname.split('/')[3]}
                            {...props}
                        />
                    </Suspense>
                    : null}
            </div>
        </section>
    )
}


export default React.memo(ExistingPatientProfile);