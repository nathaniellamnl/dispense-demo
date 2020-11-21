import React, {Fragment} from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attachedClasses;

    if(props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    } else {
        attachedClasses = [classes.SideDrawer, classes.Close];
    }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <div className={classes["spacer"]}></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;