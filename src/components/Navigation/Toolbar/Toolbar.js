import React, { useState, useContext } from 'react';

import AuthContext from '../../../context/auth-context'
import OutsideAlerter from '../../OutsideAlerter/OutsideAlerter';
import classes from './Toolbar.module.css';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Toolbar = (props) => {
    const [showLogout, setShowLogout] = useState(false);
    const authData = useContext(AuthContext);

    const logOutHandler = () => {
        authData.logout();
    }

    const cancelShowLogoutHandler = () => {
        setShowLogout(false);
    }

    const showLogoutHandler = () => {
        setShowLogout(true);
    }

    return (
        <div header className={classes.Toolbar}>
            {/* < header className={classes.Toolbar} > */}
            <IconButton onClick={props.drawerToggleClicked}>
                <MenuIcon style={{ fill: "white", cursor: 'pointer' }} />
            </IconButton>

            <OutsideAlerter cancelShowLogout={cancelShowLogoutHandler} showLogout={showLogoutHandler}>
                <div className={classes["circle"]} >A</div>
                <div
                    className={classes["logout"]}
                    style={{ display: showLogout ? 'block' : 'none' }}>
                    <ul >
                        <li onClick={logOutHandler}>Log out</li>
                    </ul>
                </div>
            </OutsideAlerter>

            {/* </header> */}
        </div>
    )
};

export default Toolbar;