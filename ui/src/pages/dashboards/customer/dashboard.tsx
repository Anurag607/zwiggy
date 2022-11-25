/* eslint-disable no-unused-vars */

/// <reference path='../../../../typings.d.ts' />

import React from 'react'
import styles from './dash.module.css'
import rightArrow from '../../../../public/right-arrow.png'
import logout from '../../../../public/logout.svg' 
import home from '../../../../public/home.png'
import { Link } from 'react-router-dom'
import Cards from '../../../components/cards/cards'

const CardGen:React.FC<{heading?:string, content?:string, price?:number, cust?: string}> = (props) => {

    let row = new Array(15).fill(1)

    return (
        <section className={styles['orders']}>
            {(row)?.map((el,i) => {
                return (
                    <Cards type='order' key={i} orderNum={i+1} cust={props.cust} content={props.content} price={props.price}/>
                )
            })}
        </section>
    )
}

const Dashboard = (props:{}) => {

    let placeholder = "Dummy"
    const [cust, Setcust] = React.useState("Customer")
    const [contents, Setcontents] = React.useState('consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ')
    const [price, Setprice] = React.useState(1240)
    const [custType, SetcustType] = React.useState("customer")
    const styling = {
        currOrder : React.useRef<HTMLDivElement>(null),
        accept : React.useRef<HTMLDivElement>(null)
    }

    const HandleClick = () => {
        styling.currOrder.current!.style.background = '#ffff9f'
        styling.accept.current!.style.display = 'none'
    }

    const foodList = JSON.parse(localStorage.getItem('content') || '[]')
    let temp = ''
    foodList.map((el:string, i:number) => {
        temp += el
        if(i < foodList.length-1) temp += ', '
    })

    React.useEffect(() => {
        if(temp.length > 0) {
            Setcontents(temp)
        }
    }, [])

    return (
        <div id='dashboard' className={styles.dashboard}>
            <div className={styles.sidebarLogoCont}>
                <div className={styles.logo}>
                    <Link to='/' className={styles.logoImgTxt}>Z</Link>
                    <Link to='/' className={styles.logoText}>wiggy</Link>
                </div>
                <section id='sidebar' className={styles.sidebar}>
                    <span className={styles.placeholder} />
                    <Link to='/' id='logout' className={`${styles.home} ${styles.links}`}>
                        <img src={home} alt='logout' />
                        <span>Home</span>
                    </Link>
                    <Link to='/login' id='logout' className={`${styles.logout} ${styles.links}`} onClick={() => localStorage.setItem('currentLoggedIn', "")}>
                        <img src={logout} alt='logout' />
                        <span>Logout</span>
                    </Link>
                </section>            
            </div>
        <section id='profile' className={styles.profile}>
            <div className={styles.header}>
                <img src={rightArrow} alt='right-arrow' />
                Welcome!
            </div>
            <div className={styles.profile}>
                <div className={styles.profileimg} style={{backgroundImage : `url('/profile.webp')`}}/>
                <div id="info" className={styles.info}>
                    <span>{`${localStorage.getItem('currentLoggedIn')}`}</span>
                    <span>{`${placeholder}`}</span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            {(foodList!.length > 0) ? 
                <div className={styles.currOrders} ref={styling.currOrder}>
                <div className={styles.info}>
                    <div className={styles.custName}>Customer Name : {localStorage.getItem('currentLoggedIn')}</div>
                    <div className={styles.contents}>Order Contents : {contents}</div>
                    <div className={styles.price}>Total Price : {localStorage.getItem('totalCost') ? localStorage.getItem('totalCost') : 1000}</div>
                </div>
                <div className={styles.accept} ref={styling.accept}>
                    {(custType !== "cutomer") ? <></> : <div className={styles.btn} onClick={HandleClick}>Accept</div>}
                </div>
                </div>
            : <div className={styles.currOrders} style={{}}>No Current Order!</div>
            }
            <div className={styles.prevOrders}>
                <CardGen content='' price={0} cust='' />
            </div>
        </section>
        </div>
    )
}

export default Dashboard