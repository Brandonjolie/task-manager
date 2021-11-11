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

router.get('/tasks', auth, async (req, res) => {
    try {
        const result = await Task.find({ owner: req.user.id })
        res.status(200).send(result)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id
    try {
        // const result = await Task.findById(id)
        const result = await Task.findOne({ id, owner: req.user.id })
        if (!result) {
            return res.status(404).send(e)
        }
        res.status(200).send(result)

    } catch (e) {
        res.status(500).send({ error: 'Task does not exist' })
    }

})

router.patch('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid key for update" })
    }
    try {
        // const task = await Task.findByIdAndUpdate(id)

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(400).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
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