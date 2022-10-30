/// <reference path='../../../typings.d.ts' />

import React from 'react'
import styles from './home.module.css'
import NavBar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'

const Home = () => {
    return (
        <div className={styles["wrapper"]}>
            <NavBar />
            <Footer />
        </div>
    )
}

export default Home