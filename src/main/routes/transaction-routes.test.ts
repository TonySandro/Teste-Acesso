import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

describe('Transaction Routes', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        const transactionCollection = MongoHelper.getCollection('transaction')
        await (await transactionCollection).deleteMany({})
    })
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
