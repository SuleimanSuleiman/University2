module.exports.handleErrorCollage = async(err) =>{
    let errors = {name:"",location:"",} 

    if(err.code == 11000){
        errors.name = 'pleace try with another name'
    }

    if(err.message.includes('Collage validation failed')){
        Object.values(err.errors).forEach(e =>{
            errors[e.path] = e.message
        })
    }

    return errors
}