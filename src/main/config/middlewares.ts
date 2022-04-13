import { Express } from 'express'
import { cors } from '../middlewares'

export default (app: Express): void => {
    app.use(cors)
}