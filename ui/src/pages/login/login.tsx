/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
/// <reference path='../../../typings.d.ts' />
import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'

interface LoginForm extends HTMLFormControlsCollection {
    email : HTMLInputElement,
    password : HTMLInputElement
}

interface LoginFormEl extends HTMLFormElement {
    readonly elements : LoginForm
}

type template = { email : string, password : string }

export default function Login() {

    const navigate = useNavigate()

    const custDet = React.useRef({
        id: 0,
        token: "",
        name: '',
        user_type: ''
    })

    const styling = {
        email: React.useRef<HTMLInputElement>(null),
        pass: React.useRef<HTMLInputElement>(null),
        warning: React.useRef<HTMLInputElement>(null),
        toSignup: React.useRef<HTMLSpanElement>(null)
    }

    const [logindet, Setlogindet] = React.useState<template>({
        email : '',
        password : ''
    })

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let target = e.currentTarget
        switch(target.name) {
            case 'email' : {
                Setlogindet({
                    ...logindet,
                    email : target.value
                })
                break
            }
            case 'password' : {
                Setlogindet({
                    ...logindet,
                    password : target.value
                })
                break
            }
            default : {
                Setlogindet({
                    ...logindet,
                })
                break
            }
        }
    }

    const HandleSubmit = useCallback((e : React.FormEvent<LoginFormEl>) => {
        e.preventDefault();
        let status = 200
        // styling.warning.current!.style.animation = 'none'
        fetch('http://localhost:3000/api/user/login', {
            method : 'POST',
            mode : 'cors',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(logindet),
        })
        .then(response => {
            status = response.status
            return response.json()
        })
        .then(resMessage => {
            if(status !== 200) {
                styling.warning.current!.style.display = 'block'
                // styling.warning.current!.style.animation = 'shake 0.5s linear'
                styling.email.current!.style.border = '0.05rem solid red'
                styling.pass.current!.style.border = '0.05rem solid red'
                styling.toSignup.current!.style.marginTop = '3.5rem'
                // setTimeout(() => {
                //     styling.warning.current!.style.animation = 'none'
                // }, 700)
            } else {
                custDet.current = {
                    id: resMessage[0].id,
                    token: resMessage[0].token,
                    name: resMessage[0].name,
                    user_type: resMessage[0].user_type
                }
                // console.log(custDet.current)
                localStorage.setItem("custDet", JSON.stringify(custDet.current))
                localStorage.setItem("currentLoggedIn", resMessage[0].name)
                styling.warning.current!.style.display = 'none'
                styling.email.current!.style.border = 'transparent'
                styling.pass.current!.style.border = 'transparent'
                styling.toSignup.current!.style.marginTop = '5rem'
                navigate(`/`)
            }
        })
    },[logindet])

    return (
        <main className={styles.loginWrapper}>
            <div>
                <form onSubmit={HandleSubmit}>
                    <h2>Login</h2>
                    <span className={styles.warning} ref={styling.warning}>Invalid email or Password</span>
                    <span>
                        <label htmlFor='email'>
                            Email ID: 
                            <span className={styles.user}>
                                <span />
                                <input name='email' ref={styling.email} id='email' value={logindet.email} onChange={HandleChange} type="email" placeholder='Enter your Email ID' autoComplete='new-email'/>
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='password'>
                            Password: 
                            <span className={styles.pass}>
                                <span />
                                <input name='password' ref={styling.pass} id='password' value={logindet.password} onChange={HandleChange} type="password" placeholder='Enter your Password' autoComplete='new-password' />
                            </span>
                            <span>
                                Forgot your Password?
                                <Link to='/passReset' className={styles.loginLinks}>Reset Here</Link>
                            </span>
                        </label>
                    </span>
                    <input type='submit' placeholder='Login' value='Login' name='submit' className={styles.loginSubmit} />
                    {/* <section>
                        <p>Or Sign Up using </p>
                        <div>
                            <a href="#" />
                            <a href="#" />
                            <a href="#" />
                        </div>
                    </section> */}
                    <span className={styles.toSignup} ref={styling.toSignup}>
                        Dont have an account?
                        <Link to='/signup' className={styles.loginLinks}>Sign Up</Link>
                    </span>
                </form>
            </div>
        </main>
    )
}
