const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById("618d4caf2c7eaaf0e8aab118")
    // await task.populate('owner')
    // console.log(task.owner)

    // const user = await User.findById('618d4bb8dff0d896fa769093')
    // await user.populate('tasks')
    // console.log(user.tasks)
}

main()