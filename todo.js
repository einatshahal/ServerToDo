import express from 'express'
import { isLoggedIn } from './account.js'
const router = express.Router()

const createToDo = ({name, status, date, prio}) => {
    const toDo = {}
    toDo.name = name
    toDo.status = status
    toDo.date = date
    toDo.prio = prio
    
    toDo.increasePriority = () =>{
        if (toDo.prio == 'low')
            toDo.prio = 'medium'
        else if (prio == 'medium')
            toDo.prio = 'high'
    }

    toDo.decreasePriority = () =>{
        if (toDo.prio == 'high')
            toDo.prio = 'medium'
        else if (prio == 'medium')
            toDo.prio = 'low'
    }

    return toDo
}

const toDos = []

router.use('', (req, res, next) =>{
    if (!isLoggedIn)
    {   
        res.sendStatus(401)
        return 
    }
    next()
})

router.post('', (req, res) => {
    const toDo = createToDo(req.body)
    toDos.push(toDo)
    res.sendStatus(201)
})

router.get('', (req, res) => {
    const str = JSON.stringify(toDos)
    console.log(str)
    res.send(str)
})

router.get('/:name', (req, res) => {
    const toDo = toDos.find((x) => x.name === req.params.name)
    if (!toDo){
        res.sendStatus(404)
        return
    }
    res.send(JSON.stringify(toDo))
})

router.delete('/:name', (req, res) => {
    const ind = toDos.indexOf(req.params.name);
    if (ind !== -1) 
        toDos.splice(ind, 1);

    res.sendStatus(200)
})

router.put('/:name', (req, res) =>{
    const ind = toDos.findIndex((x) => x.name === req.body.name)
    toDos[ind] = createToDo(req.body)
    res.sendStatus(200)
})

router.patch('/:name/increasePriority', (req, res) => {
    const ind = toDos.findIndex((x) => x.name === req.body.name)
    toDos[ind].increasePriority()
    res.sendStatus(200)
})

router.patch('/:name/decreasePriority', (req, res) => {
    const ind = toDos.findIndex((x) => x.name === req.body.name)
    toDos[ind].decreasePriority()
    res.sendStatus(200)
})

export default router