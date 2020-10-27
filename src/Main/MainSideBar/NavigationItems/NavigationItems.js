import React, { useState } from 'react';

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css';

const NavigationItems = () => {

    const [shouldShow, setShouldShow] = useState(false);

    const toggleChildHandler = () => {
        setShouldShow(!shouldShow);
    }

    let child = <div></div>;

    if (shouldShow) {
        child = (
            <div>
                <NavigationItem link="/patient/new">New</NavigationItem>
                <NavigationItem link="/patient/existing" >Existing</NavigationItem>
            </div>
        )
    }

    return (
        <div>
            <ul>
                <li className={classes.NavigationItems} onClick={toggleChildHandler}>Patient</li>
                <ul className={classes.NavigationItems_child}>
                    {child}
                </ul>
                <NavigationItem link="/search">Search</NavigationItem>
            </ul>
        </div>
    )
};

export default NavigationItems;