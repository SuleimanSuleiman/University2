const mongoose = require('mongoose')
const collageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'pleace input the name'],
        unique: true
    },
    location:{
        type: String,
        required: [true,'pleace input the location'],
    },
    students:[
        {
            type: mongoose.Types.ObjectId,
            ref:'Student'
        }
    ],
},{
    timestamps: true
})

module.exports = mongoose.model('Collage',collageSchema)