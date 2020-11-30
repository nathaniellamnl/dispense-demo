import React, {useState, useEffect} from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    const[patientBriefInfo, setPatientBriefInfo] = useState("");

    useEffect(()=>{
        setPatientBriefInfo(props.patientBriefInfo);
    },[props]);

    return (
            <ul onClick={props.click} className={classes['list']}>
                {patientBriefInfo? patientBriefInfo.map((patient,index) => {
                  return  <NavigationItem link={"/patient/existing/" + patient._id} key={index}>
                        {patient.caseCode + " " + patient.chineseName + "(" + patient.englishName + ")"}
                    </NavigationItem>
                }):null}
            </ul>
    )
};

export default NavigationItems;