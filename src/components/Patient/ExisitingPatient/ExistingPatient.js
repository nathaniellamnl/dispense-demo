import React, {useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { graphqlServerUrl } from '../../../assets/String';
import NavigationItems from '../PatientSideBar/NavigationItems';
import classes from './ExistingPatient.module.css';
import ExistingPatientProfile from '../PatientProfile/ExistingPatientProfile';
import AuthContext from '../../../context/auth-context';

// const PersonalInfo = React.lazy(() => import('../PersonalInfo/Personalnfo')
// );

// const ExistingPatientProfile = React.lazy(() => import('../PatientProfile/ExistingPatientProfile'));


const Patient = (props) => {

    const [patientBriefInfo, setPatientBriefInfo] = useState('');
    const [isNavClick, setIsNavClick] = useState(false);

    useEffect(() => {
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
                'Authorization': 'Bearer '+ props.token
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
    }, [])

    const onNavHandler = () => {
        setIsNavClick(true);
    }

    const updateInfoHandler = (id, infoObject) => {
        const patientBriefInfoCopy = [...patientBriefInfo];
        const index=patientBriefInfoCopy.findIndex(ele=>ele._id === id);
        patientBriefInfoCopy[index] = {...infoObject,_id:id};

        setPatientBriefInfo(patientBriefInfoCopy);
    }
    return (
        <div className={classes["main-container"]}>
            <div>
                <p className={classes['sidebar-header']}>Patient List</p>
                <nav className={classes['sidebar']}>
                    <NavigationItems patientBriefInfo={patientBriefInfo} click={onNavHandler} />
                </nav>
            </div>
            <div className={classes["main-content"]}>
                {isNavClick ?
                    <Route
                        exact
                        path="/patient/existing/:id"
                        render={props => (
                                <ExistingPatientProfile
                                   token={props.token}
                                    updateInfo={updateInfoHandler}
                                    {...props}
                                />
                        )}
                    />
                    : null}

            </div>
        </div>
    )
}

export default Patient;
