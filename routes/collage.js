const express = require('express')
const router = express.Router()

const {
    createCollage,
    updateCollage,
    getCollageById,
    getCollages,
    deleteCollage
} = require('../controllers/collage')
const {
    admin,
} = require('../middleware/valifty')


//create new collage
router.post('/', admin, createCollage)

//update collage
router.put('/:id', admin, updateCollage)

//get collage by id
router.get('/:id', admin, getCollageById)

//get all collages
router.get('/', admin, getCollages)

//delete collage by id
router.delete('/:id', admin, deleteCollage)

module.exports = router