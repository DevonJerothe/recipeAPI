exports.validateModel = (model) => {
    var errorLog = {
        isValid: true,
        message: {}
    };

    const validate = model.validateSync();    
    if(!validate.isValid){
        errorLog.isValid = false;
        Object.keys(validate.errors).forEach(function(key){
            errorLog.message[key] = validate.errors[key].message;
            console.log("Error Logged")
        })
    }
    return errorLog;
}