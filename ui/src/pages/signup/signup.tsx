/* eslint-disable react-hooks/exhaustive-deps */
/// <reference path='../../../typings.d.ts' />
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './signup.module.css'

interface SignupForm extends HTMLFormControlsCollection {
    name: string,
    email: string,
    password: string,
    cnfrmPass: string
}

interface SignupFormEl extends HTMLFormElement {
    readonly elements : SignupForm
}

type template = { name: string, email: string, password: string, cnfrmPass: string, user_type: string }

export default function Signup() {

    const navigate = useNavigate()

    const styling = {
        email: React.useRef<HTMLInputElement>(null),
        warning: React.useRef<HTMLInputElement>(null),
        heading: React.useRef<HTMLHeadingElement>(null),
        tologin: React.useRef<HTMLSpanElement>(null)
    }

    const [signupdet, Setsignupdet] = React.useState<template>({
        name : "",
        password : "",
        email : "",
        user_type : "customer",
        cnfrmPass : ""
    })

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let target = e.currentTarget
        switch(target.name) {
            case 'name' : {
                Setsignupdet({
                    ...signupdet,
                    name : target.value
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
            case 'cnfrmPass' : {
                Setsignupdet({
                    ...signupdet,
                    cnfrmPass : target.value
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
        let status   = 200
        if(signupdet.password == signupdet.cnfrmPass) {
            fetch('http://localhost:3000/api/user/register', {
                method : 'POST',
                mode : 'cors',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(signupdet)
            })
            .then((response)=> {
                status = response.status
                return response.json()
            })
            .then(resMessage => {
                if(resMessage[0].token) {
                    sessionStorage.setItem("currentLoggedIn", signupdet.name)
                    styling.warning.current!.style.display = 'none'
                    styling.email.current!.style.border = 'transparent'
                    styling.heading.current!.style.marginBottom = '1rem'
                    styling.tologin.current!.style.marginTop = '4rem'
                    navigate(`/`)
                } else {
                    styling.warning.current!.style.display = 'block'
                    styling.warning.current!.style.animation = 'shake 1s infinite linear'
                    styling.email.current!.style.border = '0.05rem solid red'
                    styling.heading.current!.style.marginBottom = '0.5rem'
                    styling.tologin.current!.style.marginTop = '2rem'
                }
            })
        } else {

        }
    }, [signupdet])

    return (
        <main className={styles.signupWrapper}>
            <section />
            <section>
                <form onSubmit={HandleSubmit}>
                    <h2 ref={styling.heading}>Signup</h2>
                    <span className={styles.warning} ref={styling.warning}>Email ID Already Exists</span>
                    <span>
                        <label htmlFor='name'>
                            Full Name: 
                            <span className={styles.user}>
                                <span />
                                <input value={signupdet.name} onChange={HandleChange} name='name' id='name' type="text" placeholder='Enter your Full Name'/>
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='email'>
                            Email: 
                            <span className={styles.signupemail}>
                                <span />
                                <input ref={styling.email} value={signupdet.email} onChange={HandleChange} name='email' id='email' type="email" placeholder='Enter your Email'  autoComplete='new-email'/>
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='password'>
                            Password: 
                            <span className={styles.pass}>
                                <span />
                                <input value={signupdet.password} onChange={HandleChange} name='password' id='password' type="password" placeholder='Enter your Password' autoComplete='new-password' />
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='cnfrmPass'>
                            Confirm Password: 
                            <span className={styles.pass}>
                                <span />
                                <input value={signupdet.cnfrmPass} onChange={HandleChange} name='cnfrmPass' id='cnfrmPass' type="password" placeholder='Confirm Password' autoComplete='new-password' />
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
                        <Link to='/login' className={styles.loginLinks}>Login Here</Link>
                    </span>
                </form>
            </section>
        </main>
    )
}
