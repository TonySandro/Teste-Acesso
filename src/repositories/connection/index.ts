import mongoose from 'mongoose'

const mongoURI = "mongodb+srv://user:UgtXJp6PmnTTByeh@cluster0.v7oac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

export default function connectMongoDB(): void {
    if (mongoURI) {
        mongoose.connect(
            mongoURI, () => console.log("Connected to MongoDB")
        )
    } else {
        console.log('Failed to connect to MongoDB')
    }
}