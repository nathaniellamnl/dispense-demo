import React, { Fragment, useState } from 'react';

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
                {props.children}
        </Fragment>
    );
}

export default Layout;