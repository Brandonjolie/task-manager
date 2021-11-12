const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get('/*', (req, res) => {
    res.status(404).send({ error: "page does not exist" })
})

app.post('/*', (req, res) => {
    res.status(404).send({ error: "page does not exist" })
})

app.patch('/*', (req, res) => {
    res.status(404).send({ error: "page does not exist" })
})

app.delete('/*', (req, res) => {
    res.status(404).send({ error: "page does not exist" })
})

app.put('/*', (req, res) => {
    res.status(404).send({ error: "page does not exist" })
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
