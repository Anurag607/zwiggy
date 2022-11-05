import React from 'react'
import styles from './cards.module.css'
import { Link } from 'react-router-dom'

const placeholder = {
    heading: 'Lorem ipsum dolor sit amet',
    content: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    price: 300
}

const RestaurantCard:React.FC<{key?:number, heading?: string, content?:string, price?: number}> = (props) => {
    return (
        <div className={styles.RestaurantCardWrapper}>
            <section className={styles.img} />
            <section className={styles.content}>
                <h3>{props.heading}</h3>
                <p>{props.content}</p>
                <div>
                    <Link to='/foodItems'>
                        <span className={styles.addToCart} id="addToCart">
                            Explore
                            <img src="/next.png" alt="addToCart" />
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    )
}

const FoodCard:React.FC<{key?:number, heading?: string, content?:string, price?: number}> = (props) => {
    return (
        <div className={styles.FoodCardWrapper}>
            <section className={styles.img} />
            <section className={styles.content}>
                <h3>{props.heading}</h3>
                <p>{props.content}</p>
                <div>
                    <span className={styles.addToCart} id="addToCart">
                        Add
                        <img src="/plus.png" alt="addToCart" />
                    </span>
                    <p className={styles.itemPrice}> ₹ {props.price} </p>
                </div>
            </section>
        </div>
    )
}

const FeaturesCards:React.FC<{key?:number, heading?: string, content?:string, price?: number}> = (props) => {
    return (
        <div className={styles.FeaturesCardWrapper}>
            <section className={styles.img} />
            <section className={styles.content}>
                <h3>{props.heading}</h3>
                <p>{props.content}</p>
            </section>
        </div>
    )
}

const CardRenderer:React.FC<{type?:string, key?:number, heading?: string, content?:string, price?: number}> = (props) => {
    switch(props.type) {
        case 'Features' : {
            return <FeaturesCards key={props.key} heading={props.heading} content={props.content} />
            break
        }
        case 'restaurant' : {
            return <RestaurantCard key={props.key} heading={props.heading} content={props.content} price={props.price} />
            break
        }
        case 'food' : {
            return <FoodCard key={props.key} heading={props.heading} content={props.content} price={props.price} />
            break
        }
        default : {
            return <></>
        }
    }
}

const Cards:React.FC<{type?:string, key?:number, heading?: string, content?:string, price?: number}> = (props) => {
    return <CardRenderer type={(props.type !== '') ? props.type : ''} key={props.key ? props.key : 0} heading={(props.heading !== '') ? props.heading : placeholder.heading} content={(props.content !== '') ? props.content : placeholder.content} price={(props.price !== 0) ? props.price : placeholder.price} />
}

export default Cards