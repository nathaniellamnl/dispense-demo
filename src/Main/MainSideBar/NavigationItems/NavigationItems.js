import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
    <div>
        <ul>
            <NavigationItem link="/patient">Patient</NavigationItem>
            <NavigationItem link="/search">Search</NavigationItem>
        </ul>
    </div>
);

export default navigationItems;