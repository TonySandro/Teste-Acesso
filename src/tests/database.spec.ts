import mongoose from "mongoose";
import transactionSchema from "../Schemas/transactionSchema";
const mongoURI = "mongodb+srv://user:UgtXJp6PmnTTByeh@cluster0.v7oac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await mongoose.connect(mongoURI);
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeAll(async () => {
        await transactionSchema.deleteMany({})
    })

});