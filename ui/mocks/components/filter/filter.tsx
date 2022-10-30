/// <reference path='../../../typings.d.ts' />
import { ResultType } from '@remix-run/router/dist/utils'
import React from 'react'
import styles from './filter.module.css'

interface FilterForm extends HTMLFormControlsCollection {
    gender : HTMLInputElement
}

interface FilterFormEl extends HTMLFormElement {
    readonly elements : FilterForm
}

type template = { gender : string, result : string[] }

const ListGen:React.FC<{key : number, name: string}> = (props) => {
    return <span>{props.name}</span>
}

const FilterResult:React.FC<{items:string[]}> = (props) => {
    return (
        <div className={styles.filterResult}>
            {props.items.map((el,i) => {
                return <ListGen key={i} name={el}/>
            })}
        </div>
    )
}

const Filter = () => {
    const [filter, Setfilter] = React.useState<template>({
        gender: '',
        result: ['Select a gender']
    })

    const HandleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        let target = event.currentTarget
        switch(target.name) {
            case 'gender' : {
                Setfilter({
                    ...filter,
                    gender : target.value
                })
                break
            }
            default : {
                Setfilter({
                    ...filter
                })
                break
            }
        }
    }

    const HandleSubmit = React.useCallback((event: React.FormEvent<FilterFormEl>) => {
        event.preventDefault()
        fetch('http://localhost:3001/mocks/api/filter', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify(filter)
        })
        .then(response => response.json())
        .then(data => {
            Setfilter({
                ...filter,
                result : data
            })
        })
        .catch((error) => {
            console.log(error.message)
        })
    }, [filter])

    return (
        <div className={styles.wrapper}>
            <form onSubmit={HandleSubmit} id='filterform'>
                <select name='gender' id='gender' form='filterform' onChange={HandleChange} onBlur={HandleChange} placeholder='Select a gender'>
                    <option value='' disabled selected hidden>Choose Gender...</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <input type='submit' value='Submit' placeholder='Submit' name='submit' id='submit' />
            </form>
            <FilterResult items={filter.result}/>
        </div>
    )
}

export default Filter