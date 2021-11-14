const Task = require('../src/models/task')
const User = require('../src/models/user')
const request = require('supertest')
const app = require('../src/app')
const { user2, task1, setupDatabase2 } = require('./fixtures/db')

beforeEach(setupDatabase2)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send({
            description: "From testing"
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get all tasks for user 2', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete task owned by other user', async () => {
    const del_url = `/tasks/${task1._id}`
    const response = await request(app)
        .delete(del_url)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`).send()
        .expect(404)
})