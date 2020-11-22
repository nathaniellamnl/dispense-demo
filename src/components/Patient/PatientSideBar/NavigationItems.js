import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    const patientBriefInfo = props.patientBriefInfo;

    return (
            <ul onClick={props.click} className={classes['list']}>
                {patientBriefInfo? patientBriefInfo.map(patient => {
                  return  <NavigationItem link={"/patient/existing/" + patient._id} key={patient.caseCode}>
                        {patient.caseCode + " " + patient.chineseName + "(" + patient.englishName + ")"}
                    </NavigationItem>
                }):null}
            </ul>
    )
};

export default navigationItems;