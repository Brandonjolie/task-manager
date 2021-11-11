const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        const newtask = await task.save()
        res.status(201).send(newtask)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const result = await Task.find({})
        res.status(200).send(result)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
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

})

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid key for update" })
    }
    try {
        const task = await Task.findByIdAndUpdate(id)
        updates.forEach((update) => task[update] = req.body[update])
        if (!task) {
            console.log(id)
            return res.status(400).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const user = await Task.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router