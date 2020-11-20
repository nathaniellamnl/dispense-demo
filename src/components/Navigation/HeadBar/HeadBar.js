import React from 'react';
import { NavLink } from 'react-router-dom';

import MobileToggle from '../MobileToggle/MobileToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './HeadBar.module.css';
import classes from './HeadBar.module.css';

const mainNavigation = props => (
  <nav className="head-bar">
    <MobileToggle onOpen={props.onOpenMobileNav} />
    
    <div className="spacer" />
    <div className={classes["circle"]}>A</div>
    {/* <ul className="main-nav__items">
      <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
    </ul> */}
  </nav>
);

export default mainNavigation;
