import request from 'supertest'
import app from '../config/app'

describe('Transaction Routes', () => {
    test('Should return an account on success', async () => {
        await request(app)
            .post('/api/fund-transfer')
            .send({
                accountOrigin: "123",
                accountDestination: "1234",
                value: 123
            })
            .expect(200)
    })
})
