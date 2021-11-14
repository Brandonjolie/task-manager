
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const user1ID = mongoose.Types.ObjectId()
const user2ID = mongoose.Types.ObjectId()
const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const user1 = {
    _id: user1ID,
    name: "Mike",
    email: "mike@example.com",
    password: "12321basdjsak!",
    tokens: [{
        token: jwt.sign({ _id: user1ID }, process.env.JWT_SECRET)
    }]
}


const user2 = {
    _id: user2ID,
    name: "Mike",
    email: "mike2@example.com",
    password: "12321basdjsak!",
    tokens: [{
        token: jwt.sign({ _id: user2ID }, process.env.JWT_SECRET)
    }]
}

const auth_String = `Bearer ${user1.tokens[0].token}`

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Owned by user 1',
    completed: true,
    owner: user1._id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Owned by user 2 - task 1',
    completed: true,
    owner: user2._id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Owned by user 2 - task 2',
    completed: false,
    owner: user2._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(user1).save()
}

const setupDatabase2 = async () => {
    await User.deleteMany()
    await new User(user2).save()
    await Task.deleteMany()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}

module.exports = {
    user1,
    user2,
    auth_String,
    user1ID,
    setupDatabase,
    setupDatabase2,
    task1

}