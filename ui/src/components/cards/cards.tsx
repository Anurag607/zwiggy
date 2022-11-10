import React, { MutableRefObject } from 'react'
import styles from './cards.module.css'
import { Link, useNavigate } from 'react-router-dom'

const placeholder = {
    heading: 'Lorem ipsum dolor sit amet',
    content: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    price: 300
}

let menu:Object = {}

const Cards:React.FC<{type?:string, heading?: string, content?:string, price?: number}> = (props) => {

    const id = React.useRef<number>(0)
    const navigate = useNavigate()

    const HandleRequest = React.useCallback((props: number | MutableRefObject<number>) => {
        fetch(`http://localhost:3000/api/restaurants/${props}/menu`, {
            method: 'GET',
            mode: "cors",
            headers: { 'Content-type' : 'application/json', 'token' : `` }
        })
        .then(response => {
            return response.json()
        })
        .then(resMessage => {
            menu = resMessage
            navigate(`/restaurants/${id.current}`)
        })
        .catch((err) => {
            console.error(err.message)
        })
    }, [id])
    
    const Handleclick = React.useCallback((event:React.MouseEvent<HTMLSpanElement>) => {
        let target:any = event.currentTarget
        switch(target.id) { 
            case 'explore' : {
                // HandleRequest(id.current)
                navigate(`/restaurants/${id.current}`)
                break
            }
        }
    }, [id])
    
    const RestaurantCard:React.FC<{heading?: string, content?:string, price?: number, image?: string, id?: number}> = (props) => {
        return (
            <div className={styles.RestaurantCardWrapper}>
                <section className={styles.img} style={{backgroundImage: `url(${props.image ? props.image : '/table.jpg'})`}} />
                <section className={styles.content}>
                    <h3>{props.heading}</h3>
                    <p>{props.content}</p>
                    <div>
                        <span className={styles.addToCart} id="explore" onClick={(event:React.MouseEvent<HTMLSpanElement>) => {
                            id.current = 1
                            Handleclick(event)
                        }}>
                            Explore
                            <img src="/next.png" alt="addToCart" />
                        </span>
                    </div>
                </section>
            </div>
        )
    }
    
    const FoodCard:React.FC<{heading?: string, content?:string, price?: number, image?: string}> = (props) => {
        return (
            <div className={styles.FoodCardWrapper}>
                <div className={styles.img} style={{backgroundImage: `url(${props.image ? props.image : '/kheer.jpg'})`}} />
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
    
    const FeaturesCards:React.FC<{heading?: string, content?:string, price?: number, image?: string}> = (props) => {
        return (
            <div className={styles.FeaturesCardWrapper}>
                <section className={styles.img} style={{backgroundImage: `url(${props.image ? props.image : '/bg1.jpg'})`}} />
                <section className={styles.content}>
                    <h3>{props.heading}</h3>
                    <p>{props.content}</p>
                </section>
            </div>
        )
    }
    
    const CardRenderer:React.FC<{type?:string, heading?: string, content?:string, price?: number, image?: string}> = (props) => {
        switch(props.type) {
            case 'Features' : {
                return <FeaturesCards heading={props.heading} content={props.content} image={props.image} />
                break
            }
            case 'restaurant' : {
                return <RestaurantCard heading={props.heading} content={props.content} price={props.price} image={props.image} />
                break
            }
            case 'food' : {
                return <FoodCard heading={props.heading} content={props.content} price={props.price} image={props.image} />
                break
            }
            default : {
                return <></>
            }
        }
    }

    return <CardRenderer type={(props.type !== '') ? props.type : ''} heading={(props.heading !== '') ? props.heading : placeholder.heading} content={(props.content !== '') ? props.content : placeholder.content} price={(props.price !== 0) ? props.price : placeholder.price} />
}

export default Cards
export { menu }