/* eslint-disable no-unused-vars */

/// <reference path='../../../../typings.d.ts' />

import React from 'react'
import styles from './dash.module.css'
import rightArrow from '../../../../public/right-arrow.png'
import logout from '../../../../public/logout.svg' 
import change from '../../../../public/change.svg'
import { Link } from 'react-router-dom'

const Dashboard = (props:{}) => {

    let placeholder = "Dummy"

  return (
      <div id='dashboard' className={styles.dashboard}>
      <section id='sidebar' className={styles.sidebar}>
        <div className={styles.title}>
          <h1>S</h1>
          <span>c</span>
          <h3>i</h3>
          <span>sco</span>
        </div>
        <Link to='/login' id='change' className={styles.change}>
            <img src={change} alt='logout' />
            <span>Change User</span>
        </Link>
        <Link to='/login' id='logout' className={styles.logout} onClick={() => localStorage.setItem('currentLoggedIn', "")}>
            <img src={logout} alt='logout' />
            <span>Logout</span>
        </Link>
        <Link to='/login' id='logout' className={styles.logout}>
            <img src={logout} alt='logout' />
            <span>Home</span>
        </Link>
      </section>
      <section id='profile' className={styles.profile}>
        <div className={styles.header}>
          <img src={rightArrow} alt='right-arrow' />
          Welcome!
        </div>
        <div className={styles.profile}>
          <form id="theImageForm" className={styles.profileimg}>
            <label htmlFor='theImageField' className={styles.imgCont} id='theImageContainer'>
              <input type='file' name="theImageField" id='theImageField' className={styles.imgField} accept="images/png, image/jpeg" title="" />
            </label>
            <span className={`${styles.imgError} hide`} id='errorMessage'/>
            <span className={`${styles.imgSuccess} hide`} id='successMessage' />
            <span className={styles.btnCont}>
              <button className={styles.imgUpload} id='imgUpload' type='submit'>Upload</button>
              <button className={styles.imgReset} id='clearImage' type='reset'>Clear</button>
            </span>
          </form>
          <div id="info" className={styles.info}>
            <span>{`${localStorage.getItem('currentLoggedIn')}`}</span>
            <span>{`${placeholder}`}</span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={styles.exp}>
            <div className={styles.head}>
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>
                <span></span>
              </div>
            </div>
            <div className={styles.head}>
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>
                <span></span>
              </div>
            </div>
        </div>
        <div className={styles.stat1}>
          <div className={styles.head}>
            <div>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
          </div>
        </div>
        <div className={styles.stat2}>
          <div className={styles.head}>
            <div>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
          </div>
        </div>
        <div className={styles.stat3}>
          <div className={styles.head}>
            <div>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard