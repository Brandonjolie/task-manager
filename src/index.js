const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


app.use((req, res, next) => {
    res.status(503).send('Site under maintenance, return soon')
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

// const jwt = require('jsonwebtoken')
// const func = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisisarandomtokenusedforsecurity', { expiresIn: "10 seconds" })
//     console.log(token)
//     console.log(jwt.verify(token, 'thisisarandomtokenusedforsecurity'))
// }

// func()
