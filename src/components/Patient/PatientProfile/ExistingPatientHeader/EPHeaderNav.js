import React from 'react';

import NavigationItems from '../../../Navigation/NavigationItems/NavigationItems';
import classes from './EPHeaderNav.module.css';

const mainNavigation = props => (
  <nav className={classes.main_nav}>
    
    <div className={classes.spacer} />
    <ul className={classes.main_nav__items}>
      <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
    </ul>
  </nav>
);

export default mainNavigation;
