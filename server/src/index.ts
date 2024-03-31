// import { dirname, join as joinPath } from 'node:path';
// import { fileURLToPath } from 'node:url';
import cors from 'cors'
import express from 'express'
import {json} from 'express'

import { expressPingMiddleware } from './lib/server'
import { authRouter } from './api/auth'

const app = express()

app.use(json())
app.use(cors())

app.use('/v1/auth', authRouter)

app.get('/ping', expressPingMiddleware)

app.listen(8080)

