import React from 'react';
import classes from './Message.module.css';

interface PropsType {
  message: string,
  id: number
}

const Message: React.FC<PropsType> = (props) => {
  return <div className={classes.message}>{props.message}</div>;
};

export default Message;
