import React from 'react';
import classes from "./Button.module.css";

const Button = (props) => {
    return (
        <section className={classes['button-container']}>
            {
            props.buttonNames.map((name) => {
               return <button onClick={name==="Cancel"?props.cancel:props.action} key={name} className={classes.button} type="button">{name}</button>
            })}
        </section>
    )
}

export default Button;