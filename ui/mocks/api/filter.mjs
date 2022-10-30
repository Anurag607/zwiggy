import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {readFile, writeFile} from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(morgan('dev'))

const PORT = 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dirpath = path.dirname(import.meta.url)

console.log(`__dirname : ${__dirname} & dirpath : ${dirpath}`)

app.get('/mocks/api/filter', async (req, res, next) => {
    console.log("HELLO!")
    try {
        const data = await readFile('../data/items.json', 'utf-8')
        const items = JSON.parse(data)['data']
        res.send(items)
        next()
    } catch(err) {
        console.log(err.message)
        res.send("OOPS! Couldn't read data (GET)")
    }
})

app.post('/mocks/api/filter', async (req, res, next) => {
    try {
        const data = await readFile('../data/items.json', 'utf-8')
        const items = JSON.parse(data)['data']
        let result = []
        if(data) {
            items.map((el,i) => {
                if(el.flag === req.body.gender) {
                    result.push(el.name)
                }
            })
            if(result.length === 0) result.push('Select a Gender')
            res.send(result)
        } else {
            console.log("Data not found")
            res.status(404).send("DATA NOT FOUND!")
        }
        next()
    } catch(err) {
        console.log(err.message)
        res.send("OOPS! Couldn't read data (POST)")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app