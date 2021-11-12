const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONN_STRING,
    {
        useNewUrlParser: true
    })


