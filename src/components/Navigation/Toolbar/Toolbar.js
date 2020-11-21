import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <IconButton onClick={props.drawerToggleClicked}>
            <MenuIcon style={{ fill: "white", cursor: 'pointer' }} />
        </IconButton>

        <div className={classes["circle"]}>A</div>
        {/* <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav> */}
    </header>
);

export default toolbar;