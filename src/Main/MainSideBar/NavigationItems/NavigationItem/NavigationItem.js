import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {

    let mainNavItem = (
        <NavLink  to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
    );

    // if (props.link == "/patient") {
    //     mainNavItem = (
    //         <ul>
    //             <li className={classes.NavigationItem}>
    //                 <NavLink
    //                     to={props.link+"/new"}
    //                     activeClassName={classes.active}>{props.children}</NavLink>
    //             </li>
    //             <li className={classes.NavigationItem}>
    //                 <NavLink
    //                     to={props.link+"/existing"}
    //                     activeClassName={classes.active}>{props.children}</NavLink>
    //             </li>
    //         </ul>
    //     )
    // }

    return (
        <li className={classes.NavigationItem}>
            {/* NavLink auto determines if it is active */}
            {mainNavItem}
        </li>
    )
};

export default React.memo(navigationItem);