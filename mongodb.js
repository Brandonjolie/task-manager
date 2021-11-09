// CRUD


const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    // D CRUD
    // db.collection('users').deleteMany({ age: 27 }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteOne(
        {
            _id: ObjectId("618a9cfa0c2a02eddee21c09")
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    // U CRUD
    // db.collection('tasks').updateMany({
    //     completed: true
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error, 'Ifuck your bitch')
    // })

    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectId("618aa2948c094a50812dd703")
    //     },
    //     {
    //         $inc: {
    //             age: 200
    //         }
    //     }
    // ).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // // const found = db.collection('tasks')

    // found.findOne({ _id: new ObjectId("618a9df6bbdce54938bc3cae") }, (error, tasks) => {
    //     console.log(tasks)
    // }
    // )

    // found.find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })
})