/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './cart.module.css'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import { useNavigate, useLocation } from 'react-router-dom'

const SideBar = (props: {content?: string, price?: number, item_name?: string}) => {

    const row = new Array(5).fill(1)

    return (
        <section className={styles.sidebar}>
            {row.map((el,i) => {
                return (
                    <Cards type='food' key={i} heading={props.item_name} content={props.content} price={props.price}/>
                )
            })
            }
        </section>
    )
}

const Bill = () => {
    return (
        <div className={styles.bill}></div>
    )
}

const Cart = () => {
    
    return (
        <div className={styles.cartWrapper}>
            <NavBar />

            <div className={styles.navSep} style={{width: '100vw', height: '20vh'}} />

            <section className={styles.content}>
                <SideBar content='' price={0} item_name='' />
                <Bill />
            </section>

            <div className={styles.navSep} style={{width: '100vw', height: '20vh'}} />
            
            <Footer />
        </div>
    )
}

export default Cart