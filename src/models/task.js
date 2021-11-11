const mongoose = require('mongoose')
const validator = require('validator')
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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = Task