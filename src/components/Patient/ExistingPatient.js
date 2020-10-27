import React, { Fragment, useEffect, useState,Suspense } from 'react';
import { Route } from 'react-router-dom';

import { graphqlServerUrl } from '../../assets/String';
import NavigationItems from './PatientSideBar/NavigationItems';
import classes from '../../Main/Main.module.css';

const PersonalInfo = React.lazy(() => import('./PersonalInfo/Personalnfo')
);

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
        console.log("fetching1");
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
            console.log("fetching2");
    
            return res.json();
        }).then(resData => {
            setPatientBriefInfo([...resData.data.patients]);
            console.log()
        }).catch(err => {
        })
    
    },[])

    const onNavHandler= ()=> {
        setIsNavClick(true);
    }
    return (
        <Fragment>
            <div className={classes.main_container}>
                <menu className={classes.main_sidebar}>
                    <NavigationItems patientBriefInfo={patientBriefInfo} click={onNavHandler} />
                </menu>
                <div className={classes.main_content}>
                    {isNavClick? <Route
                        path="/patient/:id"
                        render={props => (
                            <Suspense fallback={<div>Loading...</div>}>
                            <PersonalInfo
                                routeName="/patient/existing"
                                {...props}
                            />
                            </Suspense>
                        )}/> : null}
                    
                </div>
            </div>
        </Fragment>
    )
}

export default Patient;
