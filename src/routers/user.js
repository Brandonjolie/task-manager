const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('test')
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(`${e}`)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    const id = req.params.id

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid key for update" })
    }
    try {
        const user = await User.findByIdAndUpdate(id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router