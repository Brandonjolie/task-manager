const express = require('express')
const Task = require('./models/task')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    }
    catch (e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        const newtask = await task.save()
        res.status(201).send(newtask)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const result = await Task.find({})
        res.status(200).send(result)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Task.findById(id)
        if (!result) {
            return res.status(404).send()
        }
        res.status(200).send(result)

    } catch (e) {
        res.status(500).send()
    }

    // Task.findById(id).then((result) => {
    //     if (!result) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(result)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
