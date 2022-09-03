module.exports.handleError =(status,message,obj) =>{
    let err = new Error()
    err.status = status
    err.message = message
    err.obj = obj || {}
    return err
}
