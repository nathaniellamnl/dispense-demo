import React from 'react';
import classes from './Home.module.css'
import Pill from '../../assets/Images/Pill.jpg';

const Home = () => {
    return (
        <div className={classes["header-container"]}>   
            <h1 className={classes["welcome-header"]}>Welcome to Dispense Application!</h1>
            <div/>
        </div> 
    )
}


export default Home;