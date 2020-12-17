import React, { Fragment, useEffect } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';


const Modal = (props) => {

  return (
    <Fragment>
      <Backdrop show={props.show}  />
      <div
        className={classes.Modal}
        style={{
          display: props.show ? 'block' : 'none',
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
          width: props.width,
          height:props.height,
        }}>
         <div className={classes["close-icon-container"]}>
           <IconButton onClick={props.modalClosed}>
             <CloseIcon style={{ cursor: 'pointer' }}/>
           </IconButton>
           </div> 
        {props.children}
      </div>
    </Fragment>
  );
}

export default Modal;