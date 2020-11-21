import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/patient/new">New</NavigationItem>
        <NavigationItem link="/patient/existing">Existing</NavigationItem>
    </ul>
);

export default navigationItems;