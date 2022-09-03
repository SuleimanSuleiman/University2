module.exports.handleErrorStudents = async (err) => {
    let errors = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        codeStudent: "",
    }

    if (err.code == 11000) {
        if(err.keyPattern.email){
            errors.email= 'pleace try with another email'
        }
        if(err.keyPattern.codeStudent){
            errors.codeStudent = 'pleace try with another code'
        }
        return errors
    }

    if (err.message.includes('Student validation failed')) {
        Object.values(err.errors).forEach(e => {
            errors[e.path] = e.message
        })
    }

    return errors
}