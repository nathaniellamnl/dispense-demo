import React, { Fragment, useState } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(true);

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
        props.shrinkToggler(!showSideDrawer);
    }
    
    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
        props.shrinkToggler(!showSideDrawer);
    }


    return (
        <Fragment>
            <Toolbar show={showSideDrawer} drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer show={showSideDrawer} closed={sideDrawerCloseHandler} />
                {props.children}
        </Fragment>
    );
}

export default Layout;