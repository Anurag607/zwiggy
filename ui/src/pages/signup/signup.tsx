/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './signup.module.css'

interface SignupForm extends HTMLFormControlsCollection {
    fname: string,
    email: string,
    username: string,
    password: string
}

interface SignupFormEl extends HTMLFormElement {
    readonly elements : SignupForm
}

type template = { fname: string, email: string, username: string, password: string }

export default function Signup() {

    const navigate = useNavigate()

    const styling = {
        email: React.useRef<HTMLInputElement>(null),
        warning: React.useRef<HTMLInputElement>(null),
        heading: React.useRef<HTMLHeadingElement>(null),
        tologin: React.useRef<HTMLSpanElement>(null)
    }

    const [signupdet, Setsignupdet] = React.useState<template>({
        fname : "",
        username : "",
        email : "",
        password : ""
    })

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let target = e.currentTarget
        switch(target.name) {
            case 'fname' : {
                Setsignupdet({
                    ...signupdet,
                    fname : target.value
                })
                break
            }
            case 'username' : {
                Setsignupdet({
                    ...signupdet,
                    username : target.value
                })
                break
            }
            case 'email' : {
                Setsignupdet({
                    ...signupdet,
                    email : target.value
                })
                break
            }
            case 'password' : {
                Setsignupdet({
                    ...signupdet,
                    password : target.value
                })
                break
            }
            default : {
                Setsignupdet({
                    ...signupdet,
                })
                break
            }
        }
    }

    const HandleSubmit = React.useCallback((e: React.FormEvent<SignupFormEl>) => {
        e.preventDefault()
        fetch('/api/users/signup' ,{
            method : 'POST',
            mode : 'cors',
            headers : { 'Content-type' : 'application/json' },
            body : JSON.stringify(signupdet)
        })
        .then((response)=> response.text())
        .then(resMessage => {
            console.log(resMessage)
            if(resMessage === 'success') {
                styling.warning.current!.style.display = 'none'
                styling.email.current!.style.border = 'transparent'
                styling.heading.current!.style.marginBottom = '1rem'
                styling.tologin.current!.style.marginTop = '4rem'
                navigate(`/home`)
            } else {
                styling.warning.current!.style.display = 'block'
                styling.email.current!.style.border = '0.05rem solid red'
                styling.heading.current!.style.marginBottom = '0.5rem'
                styling.tologin.current!.style.marginTop = '2rem'
            }
        })
    }, [signupdet])

    return (
        <main className={styles.signupWrapper}>
            <section />
            <section>
                <form onSubmit={HandleSubmit}>
                    <h2 ref={styling.heading}>Signup</h2>
                    <span className={styles.warning} ref={styling.warning}>Email Already Exists</span>
                    <span>
                        <label htmlFor='fname'>
                            Full Name: 
                            <span className={styles.user}>
                                <span />
                                <input value={signupdet.fname} onChange={HandleChange} name='fname' id='fname' type="text" placeholder='Enter your Full Name'/>
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='email'>
                            Email: 
                            <span className={styles.signupemail}>
                                <span />
                                <input ref={styling.email} value={signupdet.email} onChange={HandleChange} name='email' id='email' type="email" placeholder='Enter your Email'/>
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='password'>
                            Password: 
                            <span className={styles.pass}>
                                <span />
                                <input value={signupdet.password} onChange={HandleChange} name='password' id='password' type="password" placeholder='Enter your Password' />
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='confirmPassword'>
                            Confirm Password: 
                            <span className={styles.cnfrmpass}>
                                <span />
                                <input value={signupdet.password} onChange={HandleChange} name='password' id='confirmPassword' type="password" placeholder='Confirm Password' />
                            </span>
                        </label>
                    </span>
                    <input type='submit' placeholder='Sign Up' value='Sign Up' name='submit' className={styles.signupSubmit} />
                    {/* <section>
                        <p>Or Sign Up using </p>
                        <div>
                            <a href="#" />
                            <a href="#" />
                            <a href="#" />
                        </div>
                    </section> */}
                    <span className={styles.tologin} ref={styling.tologin} >
                        Already have an account?
                        <Link to='/login'><a className={styles.loginLinks}>Login Here</a></Link>
                    </span>
                </form>
            </section>
        </main>
    )
}
