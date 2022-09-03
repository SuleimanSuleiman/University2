const {
    handleError
} = require('../utils/handleError')
const Student = require('../models/students')
const {
    handleErrorStudents
} = require('../utils/handleErrorStudent')
const { ObjectId } = require('mongodb')


//update student
module.exports.updateStudens = async (req, res, next) => {
    try {
        const theStudent = await Student.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new: true
        })
        result = await theStudent.save()
        res.status(200).json(result)
    } catch (err) {
        const handleErr = await handleErrorStudents(err)
        next(handleError(400, 'error when saved data', handleErr))
    }
}

//delete student
module.exports.deleteStudent = async (req, res, next) => {
    let theStudent = new Object()
    try {
        theStudent = await Student.findById(req.params.id)
        await theStudent.remove()
        res.status(200).json({
            success: true
        })
    } catch (err) {
        if (theStudent == null || theStudent == '') {
            next(handleError(404, 'not Found'))
        } else {
            next(handleError(501))
        }
    }
}

//get all student
module.exports.getAllStudent = async (req, res, next) => {
    try {
        const allStudent = await Student.find({}).populate({
            path: "CollageId",
            select:{
                _id:1,
                name:1,
                location:1,
            }
        })
        res.status(200).json(allStudent)
    } catch (err) {
        next(handleError(501))
    }
}

//get student by Id
module.exports.getStudentById = async (req, res, next) => {
    let theStudent = new Object()
    try {
        const theId = req.params.id
        theStudent = await Student.aggregate([{
            $match: {
                "_id": ObjectId(theId)
            }
        },{
            $lookup:{
                from: "collages",
                localField: "CollageId",
                foreignField: "_id",
                as:"CollageId"
            }
        },{
            $project:{
                "CollageId":{
                    "students":0,
                    "createdAt": 0,
                    "updatedAt": 0,
                    "__v": 0
                }
            }
        },{
            $set:{
                "CollageId":{
                    $arrayElemAt: ["$CollageId", 0]
                }
            }
        }
    ])
        res.status(200).json(theStudent[0])
    } catch (err) {
        if (theStudent == null && theStudent == "") {
            next(handleError(404, `not found student`, {
                error: "there are not a student with this Id !!"
            }))
        } else {
            next(handleError(500, 'there are an error when Get the Student', {
                error: err.message
            }))
        }
    }
}
