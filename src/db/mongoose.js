const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
    {
        useNewUrlParser: true
    })

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password is invalid')
            }
        }
    }

})

// const me = new User({ name: "Mike", age: 30, email: "bjolie@gmail.com", password: "password" })

// me.save().then((result) => {
//     console.log(me, result)
// }).catch((error) => {
//     console.log("User not added", error)
// })

const Task = mongoose.model('tasks', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

const task = new Task({ description: "Finish Andrew's course" })

task.save().then(() => { console.log(task) }).catch((error) => { console.log(error) })