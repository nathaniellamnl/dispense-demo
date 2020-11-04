import React, { Fragment, useEffect } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {

  // useEffect(() => {

  // }, [])

  // shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }

  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          display: props.show ? 'block' : 'none',
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
          width: props.width,
          height:props.height,
        }}>
        {props.children}
      </div>
    </Fragment>
  );
}

export default Modal;