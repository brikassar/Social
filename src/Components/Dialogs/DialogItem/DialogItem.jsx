import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';

/* Dialogs name list */

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;

  return (
    <div className={classes.dialog + ' ' + classes.active}>
      <img
        className={classes.dialogAvatar}
        src='https://i.pinimg.com/736x/75/d8/44/75d844e50a47b2da6d74f04835ada66e--overwatch-mercy-anime-girls.jpg'
        alt='PostAvatar'
      />
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
