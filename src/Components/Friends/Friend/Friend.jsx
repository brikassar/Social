import React from 'react';
import classes from './Friend.module.css';

const Friend = (props) => {
  return (
    <div className={classes.friendContent}>
      <div className={classes.friendName}>Alice</div>
      <div className={classes.friendPhoto}>
        <img
          src='https://papik.pro/uploads/posts/2021-09/1630756985_5-papik-pro-p-risunki-anime-blondinki-8.jpg'
          alt='Avatar'
        ></img>
      </div>
    </div>
  );
};

export default Friend;
