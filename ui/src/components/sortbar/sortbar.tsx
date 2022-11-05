/// <reference path='../../../typings.d.ts' />

import React from 'react'
import { Link } from 'react-router-dom'
import styles from './sortbar.module.css'
import sortbar from '../../scrpits/sortbar.mjs'

const SortBar = () => {

    React.useEffect(() => {
        sortbar()
    })

    return (
        <div className={styles["sortWrapper"]} id='sortbar'>
            <div className={styles["resultCount"]}>
                489 Results
                <div className={styles.overlay} id='overlayCnt' />
            </div>
            <section className={styles["params"]}>
                <div>
                    Relevance
                    <div className={`${styles.overlay} overlay`} id='overlay' />
                </div>
                <div>
                    Delivery Time
                    <div className={`${styles.overlay} overlay`} id='overlay' />
                </div>
                <div>
                    Rating
                    <div className={`${styles.overlay} overlay`} id='overlay' />
                </div>
                <div>
                    Cost: Low To High
                    <div className={`${styles.overlay} overlay`} id='overlay' />
                </div>
                <div>
                    Cost: High To Low
                    <div className={`${styles.overlay} overlay`} id='overlay' />
                </div>
                <div className={styles.filter} id='filter'>
                    Filter
                    <img src='/filter.png' alt='filter' id='filterImg' />
                    <div className={`${styles.overlay} overlayFilter`} id='overlay' />
                </div>
            </section>
        </div>
    )
}

export default SortBar