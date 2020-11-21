import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* NavLink auto determines if it is active */}
        <NavLink
            exact={props.exact}
            to={props.link}
            activeClassName={classes.active}>
            <div>{props.children}</div>
        </NavLink>
    </li>
);

export default navigationItem;