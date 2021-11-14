const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
jest.mock('@sendgrid/mail')
const { user1, auth_String, user1ID, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)


test('Should signup new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Brandon',
            email: 'brandonjolie@gmail.com',
            password: 'MyPass777!'
        })
        .expect(201)

    // Assert database was changed correctly
    const user = await User.findById(response.body._id)
    expect(user).not.toBeNull()

    // Assert about the response
    expect(response.body).toMatchObject({
        name: 'Brandon',
        email: 'brandonjolie@gmail.com'
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login')
        .send({
            email: user1.email,
            password: user1.password
        })
        .expect(200)

    const user = await User.findById(user1ID.toString())
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not log in non-existing user', async () => {
    await request(app).post('/users/login')
        .send({
            email: "fake_email@gmail.com",
            password: user1.password
        })
        .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', auth_String)
        .send()
        .expect(200)
})

test('Should not get profile for unauthed user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', auth_String)
        .send()
        .expect(200)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Should not delete account', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Testing upload image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', auth_String)
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', 'tests/images/profile-pic.jpeg')
        .expect(200)

    const user = await User.findById(user1ID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', auth_String)
        .send({ name: 'newname' })
        .expect(200)

    const user = await User.findById(user1ID)
    expect(user.name).toBe('newname')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', auth_String)
        .send({ location: 'newname' })
        .expect(400)

    const user = await User.findById(user1ID)
    expect(user.name).toBe(user1.name)
})