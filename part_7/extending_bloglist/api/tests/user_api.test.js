const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
describe('when there is intially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('heelo', 10)
        const user = new User({ username: 'root', passwordHash, name: 'User 1' })
        await user.save()
    })
    test('creatation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root2',
            name: 'User 2',
            password: 'hello'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })
    test('creation fail with existed username', async () => {
        const newUser = {
            username: 'root',
            name: 'User 3',
            password: 'hello'
        }
        const res = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(400)
                    .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain('username must be unique')
    })
    test('creation fail with length of username < 3', async ()=>{
        const newUser = {
            username: 'ro',
            name: 'User 3',
            password: 'hello'
        }
        const res = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(401)
                    .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain('Name or Password must be at least 3 chars long')
    })
    afterAll(() => {
        mongoose.connection.close()
    })

})