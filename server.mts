import http from 'http'
import dotenvLoad from 'dotenv-load'
import app from './index.mts'

dotenvLoad()

const server =  http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})