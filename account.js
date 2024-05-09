import express from 'express'
const router = express.Router()

let username, password
let isLoggedIn = false

router.post('/register', (req, res) => {
    if (!req.body.username) {
        res.sendStatus(400)
        return
    }
    username = req.body.username
    if (!req.body.password) {
        res.sendStatus(400)
        return
    }
    password = req.body.password
    res.sendStatus(200)
})

router.post('/login', (req, res) => {
    if (req.body.username != username) {
        res.sendStatus(404)
        return
    }
    if (req.body.password != password) {
        res.sendStatus(400)
        return
    }
    isLoggedIn = true
    res.sendStatus(200)
})

export { router, isLoggedIn }