const express = require('express')
const {
    createStudent,
    loginStudent,
    logoutStudent
} = require('../controllers/auth')
const router = express.Router()

//create sutdent
router.post('/register', createStudent)


//login student
router.post('/login', loginStudent)

//logout student
router.get('/logout', logoutStudent)
module.exports = router