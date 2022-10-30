/// <reference path='../../../typings.d.ts' />

import React from 'react'
import styles from './home.module.css'
import NavBar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'

const Home = () => {

    const [search, Setsearch] = React.useState('')

    const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        Setsearch(event.currentTarget.value)
    }

    const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <div className={styles["wrapper"]}>
            <NavBar />
            <section className={`${styles['hero']} ${styles['main']}`}>
                <div className={styles['endorsement1']}>Lorem ipsum dolor sit amet</div>
                <div className={styles['endorsement2']}>consectetur adipiscing elit sed do</div>
                <form onSubmit={HandleSubmit} className={styles.search}>
                    <input type='search' name='search' id='search' value={search} onChange={HandleChange} className={styles['searchBar']}  placeholder='Search your City here' />
                    <input type='submit' name='submit' id='submit' value='Search' className={styles['searchSubmit']} />
                </form>
                <div className={styles['endorsement1']}></div>
            </section>
            <section className={`${styles['features']} ${styles['main']}`}>
                <div className={styles.navSpace} />
                <div className={styles['head']}>Features</div>
                <div className={styles['cards']}>
                    <Cards />
                </div>
            </section>
            <section className={`${styles['gallery']} ${styles['main']}`}>
                <div className={styles.navSpace} />
                <div className={styles['head']}>Collections</div>
            </section>
            <section className={`${styles['feedback']} ${styles['main']}`}>
                <div className={styles.navSpace} />
                <div className={styles['head']}>Feedback</div>
            </section>
            <Footer />
        </div>
    )
}

export default Home