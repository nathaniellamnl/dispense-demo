import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {

    let mainNavItem = (
        <NavLink  to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
    );

    return (
        <li className={classes.NavigationItem}>
            {mainNavItem}
        </li>
    )
};

export default React.memo(navigationItem);