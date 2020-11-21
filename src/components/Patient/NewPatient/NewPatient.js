import React from 'react';

import classes from './NewPatient.module.css';
import PersonalInfo from '../PersonalInfo/Personalnfo';
import image from '../../../assets/Images/Pill.jpg'

// const AsyncPersonInfo = asyncComponent(()=> {
//     return import('./PersonalInfo/Personalnfo');
// });

const Patient = (props) => {

    return (
        <div className={classes["new-patient-container"]}>
            <div className={classes.background}>
                {/* image */}
            </div>
            <div className={classes["personal-info-container"]}>
                <PersonalInfo routeName="/patient/new" />
            </div>
        </div>
    )

}

export default Patient;
