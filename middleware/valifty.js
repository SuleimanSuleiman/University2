const jwt = require('jsonwebtoken')
const {
    handleError
} = require('../utils/handleError');


module.exports.admin = async (req, res, next) => {
    const theCookie = req.cookies['session']
    if (theCookie) {
        await jwt.verify(theCookie, process.env.JWT_SEC, (err, data) => {
            if (err) {
                next(handleError(403, 'you can not access'))
            }
            req.student = data
            if(req.student.isAdmin){
                next()
            }else{
                next(handleError(403, 'you are not the dmin'))
            }
        })
    }else{
        next(handleError(403, 'you can not access'))
    }
}

module.exports.StudentAndAdmin = async (req, res, next) => {
    const theCookie = req.cookies['session']
    if (theCookie) {
        await jwt.verify(theCookie, process.env.JWT_SEC, (err, data) => {
            if (err) {
                next(handleError(403, 'you can not access'))
            }
            req.student = data
            if(req.student.isAdmin || req.params.id === req.student.id){
                next()
            }else{
                next(handleError(403, 'you are not the dmin'))
            }
        })
    }else{
        next(handleError(403, 'you can not access'))
    }
}