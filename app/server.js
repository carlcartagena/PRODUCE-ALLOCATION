const express = require('express')
const app = express()
const router = require('./routes')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongo = require('./mongodb')

dotenv.config()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "PUT,DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(
    bodyParser.json()
)

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(router)

const port = process.env.PORT || 8091

mongo.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(port)
    })
    .then(() => {
        console.log(`\x1b[36m%s\x1b[0m`, `carltime at port : ${port}`)
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })

