/// <reference path='../../../typings.d.ts'  />

import React from 'react'
import NavBar from '../../components/navbar/navbar'
import styles from './searchResult.module.css'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import SortBar from '../../components/sortbar/sortbar'
import { useLocation } from 'react-router-dom'

const searchResult = () => {

    const location = useLocation()
    const city = location.pathname.trim().split('/')[2]
    const [restaurants, Setrestaurants] = React.useState([{
        address: "",
        city: "",
        id: 0,
        name: "",
        rating: 0
    }])

    const Fetcher = () => {
        fetch(`http://localhost:3000/api/restaurants/${city}`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-type' : 'application/json' }
        })
        .then(response => {
            return response.json()
        })
        .then(resMessage => {
            Setrestaurants(resMessage)
        })
        .catch(err => {
            console.error(err.message)
        })
    }

    React.useEffect(() => {
        Fetcher()
        window.scrollTo(0,0)
    }, [city])

    const CardGen:React.FC<{heading?:string, content?:string, price?:number, data?:Object}> = (props) => {
        let rows = new Array(20).fill(1)
        return (
            <section className={styles['results']}>
                {restaurants.map((el,i) => {
                    return <Cards type='restaurant' key={i} heading={el.name} city={el.city} content={props.content} price={props.price} id={el.id}/>
                })}
            </section>
        )
    }

    return (
        <div className={styles.searchresWrapper}>
            <NavBar />

            <section className={styles.hero}>
                <div className={styles.cityName}>
                    <div className={styles.resNum}>
                        {(restaurants.length < 10) ? `00${restaurants.length}` :
                        ((restaurants.length < 100 && restaurants.length >= 10) ? `0${restaurants.length}` : restaurants.length)}
                        <div className={styles.overlay} />
                    </div>
                    Search Results For
                    <div className={styles.resCity}>
                        {city}
                        <div className={styles.overlay} />
                    </div>
                </div>
            </section>

            <div style={{width: '100vw', height: '5rem'}} />

            <SortBar resNum={restaurants.length}/>

            <CardGen heading='' content='' price={0} data={restaurants} />
            
            <Footer />
        </div>
    )
}

export default searchResult