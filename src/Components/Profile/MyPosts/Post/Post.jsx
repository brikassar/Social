import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.post}>
      <img
        src='https://etodata.ru/wp-content/uploads/2016/10/koshechka_iz_sakuraso-2.jpg'
        alt='Изображение не найдено'
      />
      {props.postMessage}
      <div className={classes.likesArea}>
        <span>Like {props.likesCount}</span>
      </div>
    </div>
  );
};

export default Post;
