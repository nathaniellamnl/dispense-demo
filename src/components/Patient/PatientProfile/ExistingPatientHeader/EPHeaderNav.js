import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './EPHeaderNav.module.css';



const mainNavigation = props => {
  const id = window.location.pathname.split('/')[3];
  const navItems = [
    { id: 'personalinfo', text: 'Personal Information', link: `/patient/existing/${id}/personalinfo`, auth: true },
    { id: 'transactionrecord', text: 'Transaction Record', link: `/patient/existing/${id}/transactionrecord`, auth: true },
    { id: 'dispenserecord', text: 'Dispense Record', link: `/patient/existing/${id}/dispenserecord`, auth: false },
  ];

  return (<nav>
    <ul className={classes.main_nav}>
      {navItems.map(item => {
         return <NavigationItem clickedHeader={props.clickedHeader} onNavHandler={props.onNavHandler} key={item.id} id={item.id} link={item.link} text={item.text} />
      })}
    </ul>
  </nav>
  )
};

export default mainNavigation;
