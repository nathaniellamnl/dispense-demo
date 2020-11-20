import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <MenuIcon />  
    </div>
);

export default logo;