/// <reference path='../../../typings.d.ts' />

import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

const NavBar = () => {
    let username = sessionStorage.getItem('currentLoggedIn')
    return (
        <div className={styles["navWrapper"]}>
            <section>
                {/* <Link to='/' className={styles.logoImg} /> */}
                <Link to='/' className={styles.logoImgTxt}>Z</Link>
                <Link to='/' className={styles.logoText}>wiggy</Link>
            </section>
            <section>
                {(( username? username : "")!.length != 0) ? 
                    <Link to='/dashboard' className={styles.navDash}>
                        <div />
                        <div>{(username ? username : 'Username')}</div>
                    </Link> :
                    <Link to='/login' className={styles.login}>Login</Link>
                }
                <Link to= '/cart' className={styles.cart} />
            </section>
        </div>
    )
}

export default NavBar