import React from 'react';
import preloader from '../../../assets/gif/preloader.gif'
import classes from './Preloader.module.css';


let Preloader = (props) => {
    return <div className={classes.preloader}> <img src={preloader} alt='NoImage' />
    </div>
}

//Проверка

export default Preloader;