import React from 'react'
import styles from './cards.module.css'
import { Link, useNavigate } from 'react-router-dom'

const placeholder = {
    custName: 'Lorem Ipsum',
    heading: 'Lorem ipsum dolor sit amet',
    content: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    price: 300
}

let a = 0
interface CartProps {
    item : {
        name: string,
        price: number,
        qty: number
    }
}

type foodItemType = {name: string, price: number, qty: number}

const Cards:React.FC<{type?:string, heading?: string, content?:string, price?: number, image?: string, id?: number, city ?: string, cust?: string, orderNum?: number}> = (props) => {

    const id = React.useRef<number>(1)
    const [count, SetCount] = React.useState(0)
    const [item,Setitem] = React.useState<{name: string, price: number, qty: number}>({
        name: 'hello',
        price: 0,
        qty: 0
    })
    const [cart, Setcart] = React.useState<{name: string, price: number, qty: number}[]>(JSON.parse(localStorage.getItem('cart') || '[]'))
    const [finalCart, Setfinalcart] = React.useState<{name: string, price: number, qty: number}[]>(JSON.parse(localStorage.getItem('finalCart')|| '[]'))
    const navigate = useNavigate()

    React.useEffect(() => {
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
        const currentFinalCart = JSON.parse(localStorage.getItem('finalCart')|| '[]')
        Setfinalcart([...cart, ...currentFinalCart])
        localStorage.setItem("finalCart", JSON.stringify(finalCart))
        UpdateCart({item})
    }, [item])
    
    const UpdateCart = (props:CartProps) => {
        console.log(a += 1)
        // console.log(props.item)

        const itemExist = cart.find(item => item.name === props.item.name)
    
        if(!itemExist) {
            Setcart([props.item, ...cart])
            localStorage.setItem('cart', JSON.stringify(cart))
            return
        } else {
            Setcart(currentCart => 
                currentCart.map((obj,i) => 
                (obj.name === props.item.name) ?
                { ...itemExist, name: props.item.name, price: props.item.price, qty: props.item.qty }
                : obj
                )
            )
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        console.log(JSON.parse(localStorage.getItem("cart")!))
        console.log(JSON.parse(localStorage.getItem("finalCart")!))
    }

    const ProductCounter = (props : {itemName?: string, price?: number}) => {
        return (
            <span className={styles.productCounter} id="addToCart">
                <div onClick={ () => {
                        if(count > 0) SetCount(count => count-1)
                        else SetCount(0)
                        Setitem({
                            name: props.itemName!,
                            price: (props.price!)*count,
                            qty: count
                        })
                    }
                }><img src="/minus.png" alt="decrease"/></div>
                <span>{`${count}`}</span>
                <div onClick={() => {
                    SetCount(count => count+1)
                    Setitem({
                        name: props.itemName!,
                        price: (props.price!)*count,
                        qty: count
                    })
                }}><img src="/plus.png" alt="increase"/></div>
            </span>
        )
    }

    const BtnRenderer:React.FC<{itemName?: string, price?: number}> = (props) => {
        return (
            <>
                {
                (count === 0) ?
                    <span className={styles.addToCart} id="addToCart" onClick={() => {
                        SetCount(count => count+1)
                        Setitem({
                            name: props.itemName!,
                            price: (props.price!)*count,
                            qty: count
                        })
                    }}>
                        Add
                        <img src="/plus.png" alt="addToCart" />
                    </span> : 
                    <ProductCounter itemName={props.itemName} price={props.price} />
                }
            </>
        )
    }
    
    const Handleclick:React.MouseEventHandler<HTMLSpanElement> = React.useCallback((event:React.MouseEvent) => {
        let target:any = event.currentTarget
        switch(target.id) { 
            case 'explore' : {
                navigate(`/restaurant/${props.city}/${props.id}`)
                break
            }
        }
    }, [id])

    const OrdersCard:React.FC<{orderNum?: number, price?: number, contents?: string, cust?: string}> = (props) => {
        return (
            <div className={styles.OrdersCardWrapper}>
                <div className={styles.info}>
                    <div className={styles.custName}>{props.cust ? props.cust : `Customer ${props.orderNum}`}</div>
                    <div className={styles.contents}>{props.contents}</div>
                    <div className={styles.price}>Total Price : {props.price}</div>
                </div>
                <div className={styles.orderNum}>{props.orderNum}</div>
            </div>
        )
    }
    
    const RestaurantCard:React.FC<{heading?: string, content?:string, price?: number, image?: string, id?: number}> = (props) => {
        return (
            <div className={styles.RestaurantCardWrapper}>
                <section className={styles.img} style={{backgroundImage: `url(${props.image ? props.image : '/table.jpg'})`}} />
                <section className={styles.content}>
                    <h3>{props.heading}</h3>
                    <p>{props.content}</p>
                    <div>
                        <span className={styles.addToCart} id="explore" onClick={(event:React.MouseEvent<HTMLSpanElement>) => {
                            id.current = props.id! | 1
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
                        <BtnRenderer itemName={props.heading} price={props.price} />                        
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
    
    const CardRenderer:React.FC<{type?:string, heading?: string, content?:string, price?: number, image?: string, order?:number, cust?: string}> = (props) => {
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
            case 'order' : {
                return <OrdersCard orderNum={props.order} contents={props.content} price={props.price} cust={props.cust} />
                break
            }
            default : {
                return <></>
            }
        }
    }

    return <CardRenderer type={(props.type !== '') ? props.type : ''} order={props.orderNum} cust={(props.cust !== '') ? props.cust : placeholder.custName} heading={(props.heading !== '') ? props.heading : placeholder.heading} content={(props.content !== '') ? props.content : placeholder.content} price={(props.price !== 0) ? props.price : placeholder.price} />
}

export default Cards