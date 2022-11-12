/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './foodItems.module.css'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import SortBar from '../../components/sortbar/sortbar'

const CardGen:React.FC<{heading?:string, content?:string, price?:number}> = (props) => {
    let rows = new Array(20).fill(1)
    return (
        <section className={styles['results']}>
            {rows.map((el,i) => {
                return <Cards type='food' key={i} heading={props.heading} content={props.content} price={props.price}/>
            })}
        </section>
    )
}

const FoodItems:React.FC<{loc?: string, address?: string, name?: string, star?: number, rating?: number, restaurantImg?: string}> = (props) => {
    return (
        <div className={styles.fooditemWrapper}>
            <NavBar />

            <section className={styles.hero}>
                <section className={styles.restaurantPic}>
                    <div className={styles.Img} style={{backgroundImage: `url(${props.restaurantImg ? props.restaurantImg : '/lemon.jpg'})`}} />
                </section>
                <section className={styles.restaurantDets}>
                    <span className={styles.name}>
                        {props.loc ? props.loc : 'Hotel Lemon'}
                    </span>
                    <span className={styles.Address}>
                        <img src='location.png' alt='location' />
                        Location : {props.loc ? props.loc : 'Napier Town, Jabalpur'}
                    </span>
                    <span className={styles.Desc}>
                        Cuisine : {props.loc ? props.loc : 'Indian, Asian, Continental, Chinese'}
                    </span>
                    <span className={styles.Rating}>
                        <span>
                            <img src='/star.png' alt='rating (Star)' />
                            {props.star ? props.star : 3.5}
                        </span>
                        {props.rating ? props.rating : 20}+ Ratings
                    </span>
                </section>
            </section>

            {/* <div style={{width: '100vw', height: '5rem'}} /> */}

            <section className={styles.content}>
                <section className={styles.filter}></section>
                <CardGen heading='' content='' price={0} />
            </section>
            
            <Footer />
        </div>
    )
}

export default FoodItems