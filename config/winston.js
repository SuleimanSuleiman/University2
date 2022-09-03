const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        // new winston.transports.File({
        //     filename: 'error.log',
        //     level: 'error',
        //     format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        // }),
        // new winston.transports.MongoDB({
        //     db: process.env.MONGODB,
        //     level: 'info',
        //     options: {
        //         useUnifiedTopology: true
        //     }
        // })
    ],
})

module.exports = logger