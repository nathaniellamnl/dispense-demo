import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { graphqlServerUrl } from '../../assets/String';
import NavigationItems from './PatientSideBar/NavigationItems';
import classes from '../../Main/Main.module.css';
import PersonalInfo from './PersonalInfo/Personalnfo';

// const AsyncPersonInfo = asyncComponent(()=> {
//     return import('./PersonalInfo/Personalnfo');
// });

const Patient = (props) => {

        return (
            <div className={classes.main_content}>
                <PersonalInfo routeName="/patient/new" />
            </div>
        )
    
}

export default Patient;
