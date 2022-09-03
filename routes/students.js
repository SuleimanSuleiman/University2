const express = require('express')
const router = express.Router()
const {
    updateStudens,
    deleteStudent,
    getAllStudent,
    getStudentById
} = require('../controllers/student')
const {
    admin, StudentAndAdmin
} = require('../middleware/valifty')

//update sutdent
router.put('/updateStudent/:id', admin, updateStudens)

//delete student
router.delete('/deleteStudent/:id', admin, deleteStudent)

//get all student
router.get('/', admin, getAllStudent)

//get studetn By Id
router.get('/:id', StudentAndAdmin, getStudentById)

module.exports = router