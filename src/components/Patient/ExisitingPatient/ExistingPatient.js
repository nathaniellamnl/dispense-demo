import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { graphqlRequest } from '../../../utils/graphqlRequest';
import NavigationItems from '../PatientSideBar/NavigationItems';
import classes from './ExistingPatient.module.css';
import ExistingPatientProfile from '../PatientProfile/ExistingPatientProfile';
import Loader from '../../../ui/Loader/Loader';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import Modal from '../../../ui/Modal/Modal';
import useWindowDimensions from '../../../utils/useWindowDimensions';


const Patient = (props) => {

    const [patientBriefInfo, setPatientBriefInfo] = useState('');
    const [isNavClick, setIsNavClick] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { height, width } = useWindowDimensions();
    const [showModal, setShowModal] = useState(false);


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

        setIsLoading(true);
        async function fetchPatientInfo(){
            const resData = await graphqlRequest(requestBody);
            setIsLoading(false);
            if(resData.error){
                alert("An error occured!");
            } else {
                setPatientBriefInfo([...resData.data.patients]);
            }
        }

        fetchPatientInfo();
    }, [])

    const onNavHandler = () => {
        setIsNavClick(true);
    }

    const updateInfoHandler = (id, infoObject) => {
        const patientBriefInfoCopy = [...patientBriefInfo];
        const index = patientBriefInfoCopy.findIndex(ele => ele._id === id);
        patientBriefInfoCopy[index] = { ...infoObject, _id: id };

        setPatientBriefInfo(patientBriefInfoCopy);
    }

    return (
        <div className={classes["main-container"]}>

            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
               <h2 >Patient List</h2>
                <nav style={{textAlign:"center"}}>
                    {isLoading ? <Loader /> :
                        <NavigationItems patientBriefInfo={patientBriefInfo} click={onNavHandler} />}
                </nav>
            </Modal>

            <div className={classes['patient-list-container']}  >
                <h2 className={classes['sidebar-header']}>Patient List</h2>
                <nav className={classes['sidebar']}>
                    {isLoading ? <Loader /> :
                        <NavigationItems patientBriefInfo={patientBriefInfo} click={onNavHandler} />}
                </nav>
            </div>
            <div className={classes["main-content"]}>
                {width < 650 ?
                    <div className={classes["search-patient-header"]} onClick={() => setShowModal(true)}>
                        <h3>Search Patient</h3>
                        <span style={{ marginTop: "5px" }}>
                            <IconButton className={classes["icon-button"]}>
                                <SearchIcon style={{ fill: "#000000" }} />
                            </IconButton>
                        </span>
                    </div>
                    : null}
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
