export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/teste-acessobankly',
    port: process.env.PORT || 3030,
    apiUrl: 'https://acessoaccount.herokuapp.com/api'
}