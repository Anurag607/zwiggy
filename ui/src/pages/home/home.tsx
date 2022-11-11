/// <reference path='../../../typings.d.ts' />

import React from 'react'
import styles from './home.module.css'
import NavBar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/cards'
import { Link, Navigate, useNavigate } from 'react-router-dom'


const CardGen:React.FC<{heading?:string, content?:string}> = (props) => {
    let row = new Array(7).fill(1)
    return (
        <div className={styles['cards']}>
            {row.map((el,i) => {
                return <Cards type='Features' key={i} heading={props.heading} content={props.content} />
            })}
        </div>
    )
}

const Features:React.FC<{heading:string, content:string}> = (props) => {
    return (
        <div className={styles.cards}>
            <section className={styles.img} />
            <section className={styles.content}>
                <h3>{props.heading}</h3>
                <p>{props.content}</p>
            </section>
        </div>
    )
}

const FeatureGen:React.FC<{heading:string, content:string}> = (props) => {
    let row = new Array(3).fill(1)
    return (
        <div className={styles['cardCont']}>
            {row.map((el,i) => {
                return <Features key={i} heading={props.heading} content={props.content} />
            })}
        </div>
    )
}

const Home = () => {

    const navigate = useNavigate()

    const [city, Setcity] = React.useState('')
    const [feedback, Setfeedback] = React.useState<{email: string, comment: string}>({
        email : '',
        comment : ''
    })

    const styling = {
        city: React.useRef<HTMLInputElement>(null),
        warning: React.useRef<HTMLSpanElement>(null)
    }

    const HandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        let target = event.currentTarget
        switch(target.name) {
            case 'city' : {
                Setcity(target.value)
                break
            }
            case 'email' : {
                Setfeedback({
                    ...feedback,
                    email: target.value
                })
                break
            }
            case 'comment' : {
                Setfeedback({
                    ...feedback,
                    comment: target.value
                })
                break
            }
            default : {
                Setcity(city)
                Setfeedback({
                    ...feedback
                })
                break
            }
        }
    }

    const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.currentTarget
        if(city.length > 0) {
            styling.city.current!.style.border = 'transparent'
            styling.warning.current!.style.display = 'none'
            navigate(`/restaurants/${city}`)
        }
        else {
            styling.city.current!.style.border = '0.05rem solid red'
            styling.warning.current!.style.display = 'block'
        }
    }

    return (
        <div className={styles["homeWrapper"]}>
            <NavBar />
            <section className ={`${styles['hero']} ${styles['main']}`}>
                <div className={styles['endorsement1']}>Lorem ipsum dolor sit amet</div>
                <div className={styles['endorsement2']}>consectetur adipiscing elit sed do</div>
                <span className={styles.warning} ref={styling.warning}>Invalid City Name</span>
                <form onSubmit={HandleSubmit} className={styles.search}>
                    <input type='text' ref={styling.city} name='city' id='city' value={city} onChange={HandleChange} className={styles['searchBar']}  placeholder='Search your City here' />
                    <input type='submit' name='searchSubmit' id='searchsubmit' value='Search' className={styles['searchSubmit']} />
                </form>
                <div className={styles['endorsement1']}></div>
            </section>
            <section className={`${styles['features']} ${styles['main']}`}>
                <div className={styles.navSpace} />
                <div className={styles['head']}>Why Choose Us?</div>
                <FeatureGen heading='Lorem ipsum dolor sit amet' content='consectetur adipiscing elit, sed do eiusmod. ' />
            </section>
            <section className={`${styles['gallery']} ${styles['main']}`}>
                <div className={styles.navSpace} />
                <div className={styles['head']}>Collections</div>
                <CardGen heading='' content='' />
            </section>
            <section className={`${styles['feedback']} ${styles['main']}`}>
                <div className={styles.navSpace} />
                <div className={styles.feedbackContent}>
                    <section>
                        <div className={styles['head']}>Feedback</div>
                        <form onSubmit={HandleSubmit}>
                            <div className={styles.inputCont}>
                                <input type="email" name='email' id='email' value={feedback.email} placeholder='Enter Your Email' onChange={HandleChange} className={styles.feedbackEmail} />
                            </div>
                            <textarea name='comment' id='comment' value={feedback.comment} placeholder='Write Your Feedback Here' className={styles.feedbackComment} onChange={HandleChange} />
                            <div className={styles.submitCont}>
                                <input type="submit" name='feedbackSubmit' id='feedbackSubmit' value='Submit' className={styles['feedbackSubmit']} />
                            </div>
                        </form>
                    </section>
                    <section className={styles.feedbackImg} />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home