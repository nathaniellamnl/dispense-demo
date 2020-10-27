import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'logout', text: 'Logout', link: '/', auth: false },
 ];

const navigationItems = props => {
  return  (
    <li className="navigation-item" key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </li>
  );
}

// [
//   ...navItems.filter(item => item.auth === props.isAuth).map(item => (
//     <li
//       key={item.id}
//       className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
//     >
//       <NavLink to={item.link} exact onClick={props.onChoose}>
//         {item.text}
//       </NavLink>
//     </li>
//   ))
// ];

export default navigationItems;
