require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const collageRouting = require('./routes/collage')
const logger = require('./config/winston')
const mongoose = require('mongoose')
const authRouting = require('./routes/auth')
const cookieParser = require('cookie-parser')
const studentRouting = require('./routes/students')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}))


async function connecting() {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('connect with backend')
    } catch (err) {
        throw Error('incurrect connenct')
    }
}

mongoose.connection.on('disconnected', () => {
    console.log(`mongodb disconnected`)
})

mongoose.connection.on('connected', () => {
    console.log(`mongodb connected`)
})



app.use('/collage', collageRouting)
app.use('/auth', authRouting)
app.use('/students',studentRouting)
app.use((err, req, res, next) => {
    let status = err.status || 501
    let message = err.message || 'there are error'
    let other = err.obj
    return res.status(status).json({
        success: false,
        status: status,
        message: message,
        stack: other
    })
})

app.listen(process.env.PORT || 8080, () => {
    connecting()
    console.log('server running ... ')
    logger.error('error when server running')
})