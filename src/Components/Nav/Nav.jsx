import React from 'react';
import { NavLink } from 'react-router-dom';
import FriendsBlock from '../Friends/FriendsBlock';
import classes from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.menuButton}>
        <NavLink
          to='/profile'
          className={(navData) =>
            navData.isActive ? classes.active : classes.menuButton
          }
        >
          Profile
        </NavLink>
      </div>
      <div className={classes.menuButton}>
        <NavLink
          to='/dialogs'
          className={(navData) =>
            navData.isActive ? classes.active : classes.menuButton
          }
        >
          Messages
        </NavLink>
      </div>
      <div className={classes.menuButton}>
        <NavLink
          to='/news'
          className={(navData) =>
            navData.isActive ? classes.active : classes.menuButton
          }
        >
          News
        </NavLink>
      </div>
      <div>
        <NavLink
          to='/music'
          className={(navData) =>
            navData.isActive ? classes.active : classes.menuButton
          }
        >
          Music
        </NavLink>
      </div>
      <div className={classes.menuButton}>
        <NavLink
          to='/settings'
          className={(navData) =>
            navData.isActive ? classes.active : classes.menuButton
          }
        >
          Settings
        </NavLink>
      </div>
      <div className={classes.menuButton}>
        <NavLink
          to='/users'
          className={(navData) =>
            navData.isActive ? classes.active : classes.menuButton
          }
        >
          Users
        </NavLink>
      </div>
      <div className={classes.friends}>
        <FriendsBlock />
      </div>
    </nav>
  );
};

export default Nav;
