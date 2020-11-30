import { Switch } from '@material-ui/core';
import React from 'react';
import classes from './NavigationItem.module.css';

const transformId = (id) => {
    switch(id) {
        case "personalinfo":
            return "Personal Information";
        case  "transactionrecord":
            return "Transaction Record";    
    }
}

const navigationItem = (props) => {
    return (
    <li className={classes.NavigationItem} onClick={()=>props.onNavHandler(props.id) }>
        <button className={props.id==props.clickedHeader?classes.active:null}>{transformId(props.id)}</button>
        </li>
        )
};

export default navigationItem;

//