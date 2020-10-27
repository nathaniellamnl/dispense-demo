import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {

    console.log(props.patientBriefInfo);
    const patientBriefInfo = props.patientBriefInfo;

    return (
        <div>
            <ul onClick={props.click}>
                {patientBriefInfo? patientBriefInfo.map(patient => {
                  return  <NavigationItem link={"/patient/existing/" + patient._id} key={patient.caseCode}>
                        {patient.caseCode + " " + patient.chineseName + "(" + patient.englishName + ")"}
                    </NavigationItem>
                }):null}
            </ul>
        </div>
    )
};

export default navigationItems;