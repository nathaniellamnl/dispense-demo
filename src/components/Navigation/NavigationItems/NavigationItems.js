import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import PatientIcon from '@material-ui/icons/PermContactCalendar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';


const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/patient/new">
            <PersonAddIcon style={{fontSize: 30}}/><span className={classes.spacer} />New Patient
            </NavigationItem>
        <NavigationItem link="/patient/existing">
            <PatientIcon style={{fontSize: 30}}/><span className={classes.spacer} />Existing Patient
        </NavigationItem>
        <NavigationItem link="/search">
            <SearchIcon style={{fontSize: 30}}/><span className={classes.spacer} />Search
        </NavigationItem>
    </ul>
);

export default navigationItems;