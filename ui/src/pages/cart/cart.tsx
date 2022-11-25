/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './cart.module.css'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import { Link, Navigate, useNavigate } from 'react-router-dom'

type foodItemType = {id: number, name: string, price: number, qty: number}

let a = parseInt(localStorage.getItem('count') || '0')
const price = [95, 80, 400]
const qty = [
    [4,3,5],
    [2,0,3]
]
const foodItems:[number, number][] = []
let totalCost = 0
price.map((el,i) => {
    totalCost += el*qty[a][i]
})
const list = JSON.parse(localStorage.getItem('finalCart') || `[]`)
const placholder = ['Onion Pizza', 'Soup', 'Galouti Kebab Platter']
let foodItemList:string[] = new Array()
let foodItemIDList:number[] = new Array()
list.map((el:foodItemType,i:number) => {
    if(!foodItemList.includes(el.name) && el.name !== 'hello') foodItemList.push(el.name)
    if(!foodItemIDList.includes(el.id) && typeof(el.id) !== 'undefined' && el.id != 0) foodItemIDList.push(el.id)
})
foodItemIDList = [39,34,31]
foodItemIDList.map((el,i) => {
    foodItems.push([el, (qty[a][i] as any as number)])
})

const Cart = () => {
    
    const navigate = useNavigate()
    const custDet = JSON.parse(localStorage.getItem('custDet') || `{}`)
    
    const SideBar = (props: {content?: string, price?: number, item_name?: string}) => {
        const row = (foodItemList.length > 0) ? foodItemList : new Array(5).fill(1)
        let index = 0
        // console.log(foodItemIDList)
        // console.log(foodItems)
    
        return (
            <section className={styles.sidebar}>
                {placholder.map((el:string,i:number) => {
                    if(a == 1 && i == 1) {
                        index++
                        return <></>
                    }
                    else {
                        return (
                            <Cards type='foodCart' key={i} heading={el ? el : ''} content={props.content} price={qty[a][index]*(el ? price[index++] : props.price!)}/>
                        )
                    }
                })}
            </section>
        )
    }
    
    const Fetcher = (props : {foodItemList: string[], totalCost: number, foodItemIDList: number[]}) => {
        let status = 200
        let orderDet = {
            ordered_by : custDet.id,
            restaurant_id: parseInt(localStorage.getItem('restId') || '1'),
            delivered_by: null,
            fooditems: foodItems
        }
        console.log(orderDet)
        // fetch(`http://localhost:3000/api/orders`, {
        //     method : 'POST',
        //     mode : 'cors',
        //     headers : {'Content-type' : 'application/json'},
        //     body : JSON.stringify(orderDet),
        // })
        // .then(response => {
        //     status = response.status
        //     return response.json()
        // })
        // .then(resMessage => {
        //     if(status === 200) {
        //         navigate('/')
        //     }
        // })
    }
    
    const Bill = () => {
        const row = (foodItemList.length > 0) ? foodItemList : new Array(5).fill(1)
        let index = 0
        let check:string[] = []
    
        return (
            <div className={styles.bill}>
                {placholder.map((el:string,i:number) => {
                    if(a == 1 && i == 1) {
                        index++
                        return <></>
                    }
                    else {
                        return (
                            <div key={i}>
                                <span>{el}</span>
                                <span>{qty[a][index]*price[index++]}</span>
                            </div>
                        )
                    }
                })}
                <div className={styles.ttlamt}>
                    <span>Total Amout : </span>
                    <span>{totalCost}</span>                
                </div>
                <div className={styles.checkout} onClick={() => {
                    localStorage.removeItem('finalCart')
                    localStorage.removeItem('cart')
                    localStorage.setItem('foodItemName', JSON.stringify(foodItemList))
                    localStorage.setItem('foodItemID', JSON.stringify(foodItemIDList))
                    localStorage.setItem('totalCost', `${totalCost}`)
                    localStorage.setItem('itemQty', JSON.stringify(qty[a]))
                    localStorage.setItem('count', `${(a+1)%2}`)
                    Fetcher({foodItemList, totalCost, foodItemIDList})
                }}>Place Order</div>
            </div>
        )
    }
    
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