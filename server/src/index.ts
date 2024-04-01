// import { dirname, join as joinPath } from 'node:path';
// import { fileURLToPath } from 'node:url';
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import { expressPingMiddleware } from './lib/server'
import { authRouter } from './api/auth'
import { cartRouter } from './api/cart'
import { userRouter } from './api/user'
import { orderRouter } from './api/order'
import { productsRouter } from './api/product'
import { logger } from './logger'

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, _, next) => {
    // @ts-ignore
    req.isAdmin = function() {
        const SECRET_ADMIN_TOKEN = 'foo'
        return req.get('X-Secret-Admin-Token') === SECRET_ADMIN_TOKEN
    }
    next()
})

app.use((req, _, next) => {
    logger.info(`incoming request ${req.method} ${new URL(`https://foo.bar${req.originalUrl}`).pathname}`)
    next()
})

app

app.use('/v1/auth', authRouter)
app.use('/v1/cart', cartRouter)
app.use('/v1/users', userRouter)
app.use('/v1/orders', orderRouter)
app.use('/v1/products', productsRouter)

app.get('/ping', expressPingMiddleware)

// app.use((req, res) => {
//     res.status(404).send({error: 'Route not found.'})
// })

runServer()

async function runServer() {
    await mongoose.connect('mongodb://root:example@127.0.0.1:27017/dumplings?authSource=admin')
    
    app.listen(8080)
}

