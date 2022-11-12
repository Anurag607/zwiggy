/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './foodItems.module.css'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import { useNavigate, useLocation } from 'react-router-dom'

type responseTemplate1 = Array<Array<Array<{id:number, item_name:string, cat_id:number, price: number}>>>
type responseTemplate2 = [string, {id: number, item_name: string, cat_id: number, price: number }[][]][]

const CardGen:React.FC<{heading?:string, content?:string, price?:number, data?:responseTemplate1}> = (props) => {

    let Fooditems:responseTemplate2 = Object.entries(props.data!)

    return (
        <section className={styles['results']}>
            {(Fooditems)?.map((el,i) => {
                return (
                    <section key={`Category ${i}`} className={styles['categories']}>
                        <div id={`${el[0]}`} className={styles.separator} style={{width: '75vw', height: '2.5rem'}}/>
                        <div key={`Category Head ${i}`} className={styles.categoryName}>{el[0]}</div>
                        <div key={`Category Menu ${i}`} className={styles['fooditems']}>
                            {el[1].map((ele,j) => {
                                let dish = (ele as any) as {id: number, item_name: string, cat_id: number, price: number }
                                return (
                                    <Cards type='food' key={j} heading={dish.item_name} content={props.content} price={dish.price}/>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </section>
    )
}

const SideBar:React.FC<{data?:responseTemplate1, handleclick:React.MouseEventHandler}> = (props) => {

    let categories:string[] = Object.keys(props.data!)

    return (
        <section className={styles.sidebar} onScroll={(event: React.UIEvent<HTMLElement>) => event.preventDefault()}>
            {categories?.map((el,i) => {
                return (
                    <a href={`#${el}`} className={styles.sidebarlinks} key={i}>
                        <span>{el}</span>
                    </a>
                )
            })
            }
        </section>
    )
}

const FoodItems:React.FC<{loc?: string, address?: string, name?: string, star?: number, rating?: number, restaurantImg?: string}> = (props) => {

    const location = useLocation()
    let restId = location.pathname.trim().split('/')[3]
    
    const [Menu,SetMenu] = React.useState<responseTemplate1>([[[{
        id: 1,
        item_name: '',
        cat_id: 0,
        price: 0
    }]]])

    const HandleClick:React.MouseEventHandler<HTMLSpanElement> = (event: React.MouseEvent) => {
        // console.log(Menu)
    }

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
        window.scrollTo(0, 0);
    }, [restId])
    
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
                <SideBar data={Menu} handleclick={HandleClick} />
                <CardGen heading='' content='' price={0} data={Menu} />
            </section>
            
            <Footer />
        </div>
    )
}

export default FoodItems