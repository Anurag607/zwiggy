/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './cart.module.css'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import { Link, useNavigate } from 'react-router-dom'

type foodItemType = {name: string, price: number, qty: number}

const price = [95, 80, 400]
let totalCost = 4*(price.reduce((partialSum, a) => partialSum + a, 0))
const list = JSON.parse(localStorage.getItem('finalCart') || "[]")
let foodItemList = new Array()
list.map((el:foodItemType,i:number) => {
    if(!foodItemList.includes(el)) foodItemList.push(el.name)
})

const SideBar = (props: {content?: string, price?: number, item_name?: string}) => {
    const row = (foodItemList.length > 0) ? foodItemList : new Array(5).fill(1)
    let index = 0
    let check:string[] = []

    return (
        <section className={styles.sidebar}>
            {row.map((el:string,i:number) => {
                if(el != 'hello') {
                    if(!check.includes(el)) {
                        check.push(el)
                        return (
                            <Cards type='foodCart' key={i} heading={el ? el : ''} content={props.content} price={4*(el ? price[index++] : props.price!)}/>
                        )
                    }
                }
            })}
        </section>
    )
}

const Bill = () => {
    const row = (foodItemList.length > 0) ? foodItemList : new Array(5).fill(1)
    let index = 0
    let check:string[] = []

    return (
        <div className={styles.bill}>
            {row.map((el:string,i:number) => {
                if(el != 'hello') {
                    if(!check.includes(el)) {
                        check.push(el)
                        return (
                            <div key={i}>
                                <span>{el}</span>
                                <span>{4*price[index++]}</span>
                            </div>
                        )
                    }
                }
            })}
            <div className={styles.ttlamt}>
                <span>Total Amout : </span>
                <span>{totalCost}</span>                
            </div>
            <Link to='/'>
                <div className={styles.checkout} onClick={() => {
                    localStorage.removeItem('finalCart')
                    localStorage.removeItem('cart')
                    localStorage.setItem('content', JSON.stringify(check))
                    localStorage.setItem('totalCost', `${totalCost}`)
                }}>Place Order</div>
            </Link>
        </div>
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