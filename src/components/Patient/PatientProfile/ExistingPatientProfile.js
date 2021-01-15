import React, { Suspense, useEffect, useState } from 'react';

import Header from '../PatientProfile/ExistingPatientHeader/EPHeaderNav';
import classes from './ExistingPatientProfile.module.css';
import { graphqlRequest } from '../../../utils/graphqlRequest';
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

    async function fetchPatientProfile() {
      const resData = await graphqlRequest(requestBody);
      if (resData.error) {
        alert("An error occured!");
      } else {
        setPatientInfo([...resData.data.patients, { _id: window.location.pathname.split('/')[3] }])
      }
    }
    fetchPatientProfile();
  }, [window.location.pathname]);

  const onClickHandler = (id) => {
    setComponent(id);
  }

  return (
    <section >
      <Header onNavHandler={onClickHandler} clickedHeader={component} />
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