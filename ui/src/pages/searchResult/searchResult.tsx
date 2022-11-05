/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './searchResult.module.css'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import SortBar from '../../components/sortbar/sortbar'

const CardGen:React.FC<{heading?:string, content?:string, price?:number}> = (props) => {
    let rows = new Array(20).fill(1)
    return (
        <section className={styles['results']}>
            {rows.map((el,i) => {
                return <Cards type='restaurant' key={i} heading={props.heading} content={props.content} price={props.price}/>
            })}
        </section>
    )
}

const searchResult = () => {
    return (
        <div className={styles.searchresWrapper}>
            <NavBar />

            <section className={styles.hero}>
                <div className={styles.cityName}>
                    <div className={styles.resNum}>
                        489
                        <div className={styles.overlay} />
                    </div>
                    Search Results For
                    <div className={styles.resCity}>
                        Jabalpur
                        <div className={styles.overlay} />
                    </div>
                </div>
            </section>

            <div style={{width: '100vw', height: '5rem'}} />

            <SortBar />

            <CardGen heading='' content='' price={0} />
            
            <Footer />
        </div>
    )
}

export default searchResult