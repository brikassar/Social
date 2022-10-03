import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img
        className={classes.sakurasoCat}
        src="https://99px.ru/sstorage/53/2018/08/tmb_233966_737566.png"
        alt="Изображение недоступно"
      />
      <div className={classes.loginBlock}>
        {props.isAuth
          ? <div>{props.login} <button onClick={props.logout}>Logout</button> </div>
          : <NavLink to={'/login'} >Login</NavLink>}

      </div>

    </header >
  );
};

export default Header;
