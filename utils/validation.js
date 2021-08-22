exports.validateModel = (model) => {

    var errorLog = {
        isValid: true,
        message: {}
    };

    const validate = model.validateSync();   
    if(validate != null && Object.keys(validate.errors).length > 0){
        errorLog.isValid = false;
        Object.keys(validate.errors).forEach(function(key){
            errorLog.message[key] = validate.errors[key].message;
        })
    }
    return errorLog;
}