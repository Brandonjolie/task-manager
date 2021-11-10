const express = require('express')
const Task = require('./models/task')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)

    })
})

app.get('/users', (req, res) => {
    User.find({}).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id).then((result) => {
        if (!result) {
            return res.status(404).send()
        }
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send()
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findById(id).then((result) => {
        if (!result) {
            return res.status(404).send()
        }
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})