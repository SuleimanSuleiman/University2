const {
    handleError
} = require('../utils/handleError');
const Collage = require('../models/collage')
const {
    handleErrorCollage
} = require('../utils/handleErrorCollage');
const {
    ObjectId
} = require('mongodb');

//create collage
module.exports.createCollage = async (req, res, next) => {
    let newCollage;
    try {
        newCollage = await Collage(req.body)
        const result = await newCollage.save()
        res.status(201).json(result)
    } catch (err) {
        if (newCollage == null && newCollage == '') {
            next(handleError(401, 'pleace input the information', {
                error: err.message
            }))
        } else {
            const handleErr = await handleErrorCollage(err)
            next(handleError(501, 'error when saved data', handleErr))
        }
    }
}

//update collage
module.exports.updateCollage = async (req, res, next) => {
    let newCollage;
    try {
        const theCollage = await Collage.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        const result = await theCollage.save()
        let {
            createdAt,
            updatedAt,
            __v,
            ...other
        } = result._doc
        res.status(201).json({
            ...other
        })
    } catch (err) {
        console.log(err)
        if (newCollage == null || newCollage == '') {
            next(handleError('404', 'not found', {
                error: 'there are not collage with this Id'
            }))
        } else {
            const handleErr = await handleErrorCollage(err)
            next(handleError(500, 'error when saved data', handleErr))
        }
    }
}

//get collage by Id
module.exports.getCollageById = async (req, res, next) => {
    let theCollage = new Object()
    try {
        const theId = req.params.id
        theCollage = await Collage.aggregate([{
                $match: {
                    _id: ObjectId(theId),
                }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "CollageId",
                    as: "students"
                }
            },
            {
                $project: {
                    updatedAt: 0,
                    __v: 0,
                    students: {
                        password: 0,
                        CollageId: 0,
                        updatedAt: 0,
                        statusOfPassword: 0,
                        isAdmin: 0,
                        __v: 0
                    }
                }
            }, {
                $set: {
                    "number of student": {
                        $size: "$students"
                    }
                }
            }
        ])
        res.status(200).json(theCollage[0])
    }catch (err) {
        if (theCollage == null && theCollage == "") {
            next(handleError(404, `not found collage`, {
                error: "there are not collage with this Id !!"
            }))
        } else {
            next(handleError(500, 'there are an error when Get the Collage', {
                error: err.message
            }))
    }
}
}

//get collages
module.exports.getCollages = async (req, res, next) => {
    try {
        const collages = await Collage.find({})
        console.log(typeof collages[0]._id)
        res.status(200).json(collages)
    } catch (err) {
        next(handleError(500, 'error when get data'))
    }
}

//delete collage
module.exports.deleteCollage = async (req, res, next) => {
    const theCollage = await Collage.findById(req.params.id)
    try {
        await theCollage.remove()
        res.status(200).json({
            success: true
        })
    } catch (err) {
        if (theCollage == null && theCollage == '') {
            next(handleError(404, `not found collage`, {
                error: "there are not collage with this Id !!"
            }))
        }
        next(handleError(500, 'error when delete the collage'))
    }
}