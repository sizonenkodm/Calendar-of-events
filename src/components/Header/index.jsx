import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.header__title}>Calendar</h1>
        </div>
    );
};

export default Header;