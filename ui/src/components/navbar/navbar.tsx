/// <reference path='../../../typings.d.ts' />

import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

const NavBar = () => {
    return (
        <div className={styles["navWrapper"]}>
            <section>
                <Link to='/home' className={styles.logoImg} />
                <Link to='/home' className={styles.logoText}>wiggy</Link>
            </section>
            <section>
                <Link to='/login' className={styles.login}>Login</Link>
                <Link to= '/cart' className={styles.cart} />
            </section>
        </div>
    )
}

export default NavBar