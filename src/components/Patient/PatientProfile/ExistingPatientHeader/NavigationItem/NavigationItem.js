import { Switch } from '@material-ui/core';
import React from 'react';
import classes from './NavigationItem.module.css';

const transformId = (id) => {
    switch(id) {
        case "personalinfo":
            return "Personal Information";
        case  "transactionrecord":
            return "Transaction Record";
        case "dispenserecord":
            return "Dispense Record";       
    }
}

const navigationItem = (props) => {
    console.log(props.clickedHeader);
    return (
    <li className={classes.NavigationItem} onClick={()=>props.onNavHandler(props.id) }>
        <button className={props.id==props.clickedHeader?classes.active:null}>{transformId(props.id)}</button>
        </li>
        )
};

export default navigationItem;

//