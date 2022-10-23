/// <reference path="modules.d.ts"/>

import express from 'express'
import dotenvLoad from 'dotenv-load'
import cors from 'cors'
import morgan from 'morgan'
import { urlencoded } from 'body-parser'
import userRoutes from './routes/user.mts'

dotenvLoad()

const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors)
app.use(express.static('public'))
app.use('/user', userRoutes)

export default app