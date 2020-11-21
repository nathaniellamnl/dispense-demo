import React, { Fragment } from 'react';

import PharmacyIcon from '@material-ui/icons/LocalPharmacy';
import classes from './Logo.module.css';

const logo = (props) => (
    <Fragment>
        <div className={classes["Logo"]}>
            <PharmacyIcon style={{ fill: "#ab1032", fontSize: 50 }} />
            <div> PHHK</div>
        </div>
        <div>
            <p className={classes["welcome-msg"]}>
                Welcome, Admin
            </p>
        </div>
        <div >
            <p className={classes["demo"]}>
                Dispense Demo
            </p>
        </div>
    </Fragment>
);

export default logo;