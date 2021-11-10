require('../src/db/mongoose')
const User = require('../src/models/user')

id = '618b5a525864632e4c3db376'

User.findByIdAndUpdate('618b55e28aff7c34dcbda311', { age: 24 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 24 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})