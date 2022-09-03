const mongoose = require('mongoose')
const {
    isEmail
} = require('validator')
const bcrypt = require('bcryptjs');
const {
    passwordStrength
} = require('check-password-strength')


const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "pleace input the first name"]
    },
    last_name: {
        type: String,
        required: [true, "pleace input the last name"],
    },
    email: {
        type: String,
        required: [true, "pleace input the email"],
        unique: true,
        validate: [isEmail, "pleace input a correct email"]
    },
    phones: {
        type: Array,
        min: 1,
        max: 2
    },
    password: {
        type: String,
        min: [8, 'password should be grate then 8'],
        required: true,
    },
    statusOfPassword: {
        type: String
    },
    codeStudent: {
        type: Number,
        required: [true, "pleace input code of student"],
        unique: true
    },
    sex: {
        type: String,
    },
    acadmicYear: {
        type: String,
        default: 'First year'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    CollageId:{
        type: mongoose.Types.ObjectId,
        ref: 'Collage'
    }
}, {
    timestamps: true
})

studentSchema.statics.login = async function (code, password) {
    const theStudent = await this.findOne({
        codeStudent: code
    })
    if (theStudent) {
        const auth = await bcrypt.compare(password,theStudent.password)
        if (auth) {
            return theStudent
        }
        throw Error('incurrect password')
    }
    throw Error('there are not student with this code')
}


studentSchema.pre('save', async function (next) {
    try {
        this.statusOfPassword = await passwordStrength(this.password).value
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err) {
        throw Error(err)
    }
})


module.exports = mongoose.model('Student', studentSchema)