import React, { Fragment, useEffect, useState,Suspense } from 'react';
import { Route } from 'react-router-dom';

import { graphqlServerUrl } from '../../../assets/String';
import NavigationItems from '../PatientSideBar/NavigationItems';
import classes from './ExistingPatient.module.css';

// const PersonalInfo = React.lazy(() => import('../PersonalInfo/Personalnfo')
// );

const ExistingPatientProfile = React.lazy( () => import('../PatientProfile/ExistingPatientProfile'));


const Patient = (props) => {

    const [patientBriefInfo,setPatientBriefInfo] = useState('');
    const [isNavClick,setIsNavClick] = useState(false);


    useEffect(()=>{
        const requestBody = {
            query: `
                 query {
                   patients {
                    _id
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
            setPatientBriefInfo([...resData.data.patients]);

        }).catch(err => {
        })    
    },[])

    const onNavHandler= ()=> {
        setIsNavClick(true);
    }
    return (
            <div className={classes["main-container"]}>
                <menu className={classes['sidebar']}>
                    <NavigationItems patientBriefInfo={patientBriefInfo} click={onNavHandler} />
                </menu>
                <main className={classes.main_content}>
                    {isNavClick? 
                    <Route
                        exact
                        path="/patient/existing/:id"
                        render={props => (
                            <Suspense fallback={<div>Loading...</div>}>
                            <ExistingPatientProfile
                                {...props}
                            />
                            </Suspense>
                        )}
                        /> 
                        : null}
                    
                </main>
            </div>
    )
}

export default Patient;
