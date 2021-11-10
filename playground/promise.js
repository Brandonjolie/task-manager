require('../src/db/mongoose')
const User = require('../src/models/user')

id = '618b5a525864632e4c3db376'


const updateAgeandCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age: age })
    return count
}

updateAgeandCount('618b55e28aff7c34dcbda311', 21).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})