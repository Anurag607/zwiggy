/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './foodItems.module.css'
import Footer from '../../components/footer/footer'
import Cards, { menu } from '../../components/cards/cards'
import { useNavigate, useLocation } from 'react-router-dom'

let placeholder = [[[{
    id: 0,
    item_name: '',
    cat_id: 0,
    price:0
}]]]

type responseTemplate1 = Array<Array<Array<{id:number, item_name:string, cat_id:number, price: number}>>>
type responseTemplate2 = [string, {id: number; item_name: string; cat_id: number; price: number; }[][]][]

const CardGen:React.FC<{heading?:string, content?:string, price?:number, data?:responseTemplate2}> = (props) => {
    // console.log(props.data)
    return (
        <section className={styles['results']}>
            {(props.data)?.map((el,i) => {
                return (
                    <div key={i} className={styles['categories']}>
                        {el[1].map((ele,j) => {
                            // console.log(ele.hasOwnProperty('item_name'))
                            // console.log(ele.item_name)
                            return (
                                // <Cards type='food' key={j} heading={''} content={''} price={0}/>
                                <Cards type='food' key={j} heading={ele.item_name} content={props.content} price={ele.price}/>
                                // <div key={j}>
                                //     {ele.map((items,k) => {
                                //         return <Cards type='food' key={k} heading={items.item_name} content={props.content} price={items.price}/>
                                //     })}
                                // </div>
                            )
                        })}
                    </div>
                )
            })}
        </section>
    )
}

// const CardGen:React.FC<{heading?:string, content?:string, price?:number, data?:responseTemplate1}> = (props) => {
//     return (
//         <section className={styles['results']}>
//             {(props.data)?.map((el,i) => {
//                 return (
//                     <div key={i} className={styles['categories']}>
//                         {el[1].map((ele,j) => {
//                             return <Cards type='food' key={j} heading={ele.item_name} content={props.content} price={ele.price}/>
//                         })}
//                     </div>
//                 )
//             })}
//         </section>
//     )
// }

const Filter:React.FC<{data?:string[]}> = (props) => {
    return (
        <section className={styles.filter}>
            {(props.data)?.map((el,i) => {
                return (
                    <form className={styles.filterForm} key={i}>
                        <span id='categoryFilter'>{el}</span>
                    </form>
                )
            })
            }
        </section>
    )
}

const FoodItems:React.FC<{loc?: string, address?: string, name?: string, star?: number, rating?: number, restaurantImg?: string}> = (props) => {

    const location = useLocation()
    let restId = location.pathname.trim().split('/')[2]
    
    const [Menu,SetMenu] = React.useState<responseTemplate1>([[[{
        id: 0,
        item_name: '',
        cat_id: 0,
        price:0
    }]]])

    const Fetcher = () => {
        fetch(`http://localhost:3000/api/restaurants/${restId}/menu`, {
            method: 'GET',
            mode: "cors",
            headers: { 'Content-type' : 'application/json', 'token' : `` }
        })
        .then(response => {
            return response.json()
        })
        .then(resMessage => {
            SetMenu(resMessage)
        })
        .catch((err) => {
            console.error(err.message)
        })
    }

    React.useEffect(() => {
        Fetcher()
    }, [restId])
    
    let categories:string[] = Object.keys(Menu)
    let fooditems:responseTemplate1 = Object.entries(menu)
    const items = Object.entries(Menu)
    let Fooditems:responseTemplate2 = Object.entries(Menu)
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
                        <img src='/location.png' alt='location' />
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

            <section className={styles.content}>
                <Filter data={categories} />
                <CardGen heading='' content='' price={0} data={Fooditems} />
            </section>
            
            <Footer />
        </div>
    )
}

export default FoodItems