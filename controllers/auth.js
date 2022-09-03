const Student = require('../models/students')
const jwt = require('jsonwebtoken')
const {
    handleError
} = require('../utils/handleError');
const {
    handleErrorStudents
} = require('../utils/handleErrorStudent')


//REGISTER
module.exports.createStudent = async (req, res, next) => {
    try {
        const student = await Student(req.body)
        const result = await student.save()
        const token = await createToken(result._id, result.isAdmin)
        res.cookie('session', token, {
            httpOnly: true,
            maxAge: 100 * 60 * 24 * 24 * 3
        })
        res.status(201).json(result)
    } catch (err) {
        const handleErr = await handleErrorStudents(err)
        next(handleError(400, 'error when saved data', handleErr))
    }
}

//LOGIN
module.exports.loginStudent = async (req, res, next) => {
    let result = new Object();
    try {
        result = await Student.login(req.body.codeStudent, req.body.password)
        const token = await createToken(result._id, result.isAdmin)
        res.cookie('session', token, {
            httpOnly: true,
            maxAge: 100 * 60 * 24 * 24 * 3
        })
        res.status(200).json(result)
    } catch (err) {
        if (err.message.includes('incurrect password')) {
            next(handleError(403, err.message))
        }else{
        next(handleError(404, err.message))
        }
    }
}

//LOGOUT
module.exports.logoutStudent = async (req, res, next) => {
    try {
        res.cookie('session', '', {
            maxAge: 0
        })
        res.status(200).json({success: true})
    } catch (err) {
        next(handleError(501))
    }
}

function createToken(id, isAdmin) {
    return jwt.sign({
        id: id,
        isAdmin: isAdmin
    }, process.env.JWT_SEC, {
        expiresIn: '3d'
    })
}