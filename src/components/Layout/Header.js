import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';
import mealsImage from '../../assets/table-hero.jpg';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <h1>My takeaway</h1>
                    <h5>by Yoav Hirshberg</h5>
                </div>

                <HeaderCartButton onToggleCart={props.onToggleCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table full of food' />
            </div>
        </Fragment>
    );
};

export default Header;