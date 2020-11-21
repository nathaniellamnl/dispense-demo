import React, { Fragment, useState } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    return (
        <Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer show={showSideDrawer} closed={sideDrawerCloseHandler} />
            {/* <main className={classes.Content}> */}
                {props.children}
            {/* </main> */}
        </Fragment>
    );
}

export default Layout;