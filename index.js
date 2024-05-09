import express from 'express'
import toDoRouter from './todo.js'
import { router as accountRouter } from './account.js'
const app = express()
const port = 3000

app.use(express.json());

app.use('/todo', toDoRouter)
app.use('/account', accountRouter)

app.listen(port)

